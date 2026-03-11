import { z } from "zod";

export const searchInputSchema = z
  .object({
    originCityId: z.string().min(1),
    category: z.enum(["concert", "sports", "conference", "retreat", "heritage"]),
    maxBudget: z.number().int().positive().max(5000).optional(),
    minBudget: z.number().int().positive().max(5000).optional(),
    partySize: z.number().int().min(1).max(8).default(1),
    nightsMin: z.number().int().min(0).max(7).optional(),
    nightsMax: z.number().int().min(1).max(10).optional(),
    startDate: z.string().date(),
    endDate: z.string().date()
  })
  .refine((value) => value.startDate <= value.endDate, {
    message: "Start date must be before end date.",
    path: ["endDate"]
  })
  .refine((value) => !value.minBudget || !value.maxBudget || value.minBudget <= value.maxBudget, {
    message: "Min budget must be less than max budget.",
    path: ["maxBudget"]
  });

