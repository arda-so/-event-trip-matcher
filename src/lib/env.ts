import { z } from "zod";

const ticketmasterEnvSchema = z.object({
  TICKETMASTER_API_KEY: z.string().min(1)
});

export function getTicketmasterEnv() {
  return ticketmasterEnvSchema.parse({
    TICKETMASTER_API_KEY: process.env.TICKETMASTER_API_KEY
  });
}
