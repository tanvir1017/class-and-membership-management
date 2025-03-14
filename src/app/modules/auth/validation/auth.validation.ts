import z from "zod";

const validateLoginUser = z.object({
  body: z.object({
    email: z.string({ required_error: "email must be provided" }),
    password: z.string({ required_error: "password must be provided" }),
  }),
});
const refreshTokenValidation = z.object({
  body: z.object({
    refreshToken: z.string({ required_error: "Refresh Token Is Required" }),
    accessToken: z.string({ required_error: "Access Token Is Required" }),
  }),
});

export const ValidateAuthUserViaZOD = {
  validateLoginUser,
  refreshTokenValidation,
};
