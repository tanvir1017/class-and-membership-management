import { z } from "zod";
import { ClassStatusArr } from "../constant/classes.constant";
import { convertDateFormat } from "../utils/classes.utils";

// Zod validation schema for class scheduling
const createClassScheduleValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(5, { message: "Class name is required" })
      .max(200, { message: "Class name cannot exceed 200 characters" })
      .trim(),
    date: z.string().refine(
      (val) => {
        // ** Ensure the date is in the correct 'dd-mm-yy' format
        const classDate = convertDateFormat(val);

        // Ensure the class date is in the future
        return classDate >= new Date();
      },
      {
        message:
          "Class date must be in the future and valid (format: dd-mm-yy)",
      },
    ),
    status: z.enum([...ClassStatusArr] as [string, ...string[]]).optional(),
    startTime: z
      .string()
      .regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, "Invalid start time format"), // Use HH:mm (e.g. "08:00" for 8 AM)'),
    endTime: z
      .string()
      .regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, "Invalid end time format"), // Use HH:mm (e.g. "16:30" for 4:30 PM)')
  }),
});
const assignTrainersValidation = z.object({
  body: z.object({
    trainer: z.array(z.string()).min(1),
  }),
});

export const ClassScheduleSchemaValidationZOD = {
  createClassScheduleValidation,
  assignTrainersValidation,
};
