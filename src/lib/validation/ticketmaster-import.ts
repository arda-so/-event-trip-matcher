import { z } from "zod";

export const ticketmasterImportSchema = z.object({
  keyword: z.string().trim().min(1).optional(),
  city: z.string().trim().min(1).optional(),
  countryCode: z.string().trim().length(2).optional(),
  classificationName: z.string().trim().min(1).default("music"),
  startDateTime: z.string().datetime().optional(),
  endDateTime: z.string().datetime().optional(),
  size: z.number().int().min(1).max(100).default(20)
});

