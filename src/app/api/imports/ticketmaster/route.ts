import { importTicketmasterEvents } from "@/data/providers/ticketmaster/import";
import { fail, ok } from "@/lib/http";
import { ticketmasterImportSchema } from "@/lib/validation/ticketmaster-import";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = ticketmasterImportSchema.safeParse(payload);

  if (!parsed.success) {
    return fail(parsed.error.flatten().formErrors[0] ?? "Invalid import input.", 400);
  }

  try {
    const result = await importTicketmasterEvents(parsed.data);
    return ok(result);
  } catch (error) {
    console.error(error);
    return fail((error as Error).message || "Import failed.", 500);
  }
}

