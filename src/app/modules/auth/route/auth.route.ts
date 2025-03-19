import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AuthController } from "../controller/auth.controller";
import { ValidateAuthUserViaZOD } from "../validation/auth.validation";

const router = Router();

router
  .route("/login")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.validateLoginUser),
    AuthController.loginValidation,
  );

router.route("/refresh-token").post(
  // sanitizeClientDataViaZod(ValidateAuthUserViaZOD.refreshTokenValidation),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
