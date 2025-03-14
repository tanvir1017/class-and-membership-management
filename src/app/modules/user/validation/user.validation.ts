import { z } from "zod";
import { T_GENDER_COMMON__TYPE } from "../../../interface/common/common.type";

export const Gender: T_GENDER_COMMON__TYPE[] = ["male", "female", "others"];

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(1).max(20),
      lastName: z.string().max(20),
    }),
    gender: z.enum([...Gender] as [string, ...string[]]),
    email: z.string().email(),
    password: z
      .string({
        invalid_type_error: "password must be string",
      })
      .min(6, { message: "Password shouldn't be less then 6 characters" })
      .max(18, { message: "Password shouldn't be more than 18 characters" }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(1).max(20).optional(),
      lastName: z.string().max(20).optional(),
    }),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    email: z.string().email().optional(),
    password: z
      .string({
        invalid_type_error: "password must be string",
      })
      .min(6, { message: "Password shouldn't be less then 6 characters" })
      .max(18, { message: "Password shouldn't be more than 18 characters" })
      .optional(),
  }),
});

const updateRoleValidationSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    role: z.enum(["admin", "trainer", "trainee"] as const),
  }),
});

export const UserSchemaValidationZOD = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateRoleValidationSchema,
};
