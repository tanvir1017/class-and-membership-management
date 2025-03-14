import { z } from "zod";

// ✅ Booking Schema Validation
export const CreateBookingSchema = z.object({
  body: z.object({
    classId: z.string(),
    traineeId: z.string().optional(),
    status: z.enum(["confirmed", "canceled"]).default("confirmed"),
  }),
});
