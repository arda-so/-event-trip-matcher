import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import {
  coerceRelationshipWorkspaceState,
  defaultRelationshipWorkspaceState
} from "@/lib/relationship-workspace";
import { fail, ok } from "@/lib/http";

function hashPasscode(passcode: string) {
  return createHash("sha256").update(passcode).digest("hex");
}

function normalizeWorkspaceKey(workspaceKey: string) {
  return workspaceKey.trim().toLowerCase();
}

type CredentialSuccess = {
  workspaceKey: string;
  passcode: string;
};

type CredentialFailure = {
  error: string;
};

function readCredentials(input: { workspaceKey?: unknown; passcode?: unknown }): CredentialSuccess | CredentialFailure {
  const workspaceKey = typeof input.workspaceKey === "string" ? normalizeWorkspaceKey(input.workspaceKey) : "";
  const passcode = typeof input.passcode === "string" ? input.passcode.trim() : "";

  if (workspaceKey.length < 3) {
    return { error: "Workspace name must be at least 3 characters." };
  }

  if (passcode.length < 4) {
    return { error: "Passcode must be at least 4 characters." };
  }

  return { workspaceKey, passcode };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const credentials = readCredentials({
    workspaceKey: searchParams.get("workspaceKey"),
    passcode: searchParams.get("passcode")
  });

  if ("error" in credentials) {
    return fail(credentials.error, 400);
  }

  try {
    const workspace = await prisma.relationshipWorkspace.findUnique({
      where: { workspaceKey: credentials.workspaceKey }
    });

    if (!workspace) {
      return ok({
        exists: false,
        data: defaultRelationshipWorkspaceState
      });
    }

    if (workspace.passcodeHash !== hashPasscode(credentials.passcode)) {
      return fail("Incorrect passcode.", 401);
    }

    return ok({
      exists: true,
      data: coerceRelationshipWorkspaceState(workspace.data)
    });
  } catch (error) {
    console.error(error);
    return fail("Failed to load workspace.", 500);
  }
}

export async function PUT(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return fail("Invalid request body.", 400);
  }

  const credentials = readCredentials(payload as { workspaceKey?: unknown; passcode?: unknown });

  if ("error" in credentials) {
    return fail(credentials.error, 400);
  }

  const data = coerceRelationshipWorkspaceState((payload as { data?: unknown }).data);

  try {
    const existing = await prisma.relationshipWorkspace.findUnique({
      where: { workspaceKey: credentials.workspaceKey }
    });

    if (existing && existing.passcodeHash !== hashPasscode(credentials.passcode)) {
      return fail("Incorrect passcode.", 401);
    }

    const saved = await prisma.relationshipWorkspace.upsert({
      where: { workspaceKey: credentials.workspaceKey },
      create: {
        workspaceKey: credentials.workspaceKey,
        passcodeHash: hashPasscode(credentials.passcode),
        data
      },
      update: {
        data
      }
    });

    return ok({
      exists: true,
      workspaceKey: saved.workspaceKey,
      data: coerceRelationshipWorkspaceState(saved.data)
    });
  } catch (error) {
    console.error(error);
    return fail("Failed to save workspace.", 500);
  }
}
