import { findTripMatches } from "@/domain/trips/find-trip-matches";
import { fail, ok } from "@/lib/http";
import { searchInputSchema } from "@/lib/validation/search";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = searchInputSchema.safeParse(payload);

  if (!parsed.success) {
    return fail(parsed.error.flatten().formErrors[0] ?? "Invalid search input.", 400);
  }

  try {
    const result = await findTripMatches(parsed.data);
    return ok(result);
  } catch (error) {
    console.error(error);
    return fail("Search failed.", 500);
  }
}

