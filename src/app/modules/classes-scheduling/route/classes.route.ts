import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { classScheduleController } from "../controller/classes.controller";
import { ClassScheduleSchemaValidationZOD } from "../validation/classes.validation";

const router = Router();

// Route for creating a class schedule (only admins can do this)
router.route("/schedule").post(
  // Only admins can create class schedules
  authGuard("admin"),
  // Sanitize the client data before creating the class schedule
  sanitizeClientDataViaZod(
    ClassScheduleSchemaValidationZOD.createClassScheduleValidation,
  ),
  // Create the class schedule
  classScheduleController.createClassSchedule,
);

// Route for creating a class schedule (only admins can do this)
router.route("/:classId/assign-trainers").patch(
  // Only admins can create class schedules
  authGuard("admin"),
  // Sanitize the client data before creating the class schedule
  sanitizeClientDataViaZod(
    ClassScheduleSchemaValidationZOD.assignTrainersValidation,
  ),
  // Create the class schedule
  classScheduleController.assignTrainersToClass,
);

// Route for fetching all class schedules
router.route("/").get(classScheduleController.getAllClassSchedules);

export const classScheduleRoutes = router;
