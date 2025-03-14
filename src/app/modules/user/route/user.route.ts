import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { UserControllers } from "../controller/user.controller";
import { UserSchemaValidationZOD } from "../validation/user.validation";

const router = Router();

// TODO => Find only yourself
router.route("/all").get(UserControllers.getAllUsers);

router.route("/email/:email").get(UserControllers.getSingleUserByMail);
// TODO => Update User
router.route("/:id").get(UserControllers.getSingleUser);

// TODO => Create a admin
router.route("/create-user").post(
  authGuard("admin"),
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(UserSchemaValidationZOD.createUserValidationSchema),
  UserControllers.createUser,
);

// TODO => Create a trainee
router.route("/create-trainee").post(
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(UserSchemaValidationZOD.createUserValidationSchema),
  UserControllers.createUser,
);

// TODO => Update User
router.route("/:id/update").patch(
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(UserSchemaValidationZOD.updateUserValidationSchema),
  UserControllers.updateUser,
);

// TODO => Delete User
router.route("/:id/delete").delete(UserControllers.deleteUser);

// TODO => Delete User
router.route("/change-role").patch(
  authGuard("admin"),
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(UserSchemaValidationZOD.updateRoleValidationSchema),
  UserControllers.changeRole,
);

export const UserRoutes = router;
