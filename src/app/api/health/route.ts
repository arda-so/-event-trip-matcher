import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";

export async function GET() {
  try {
    const [cities, events] = await Promise.all([prisma.city.count(), prisma.event.count()]);

    return ok({
      status: "ok",
      checks: {
        database: "ok"
      },
      counts: {
        cities,
        events
      }
    });
  } catch (error) {
    console.error(error);
    return fail("Health check failed.", 500);
  }
}

