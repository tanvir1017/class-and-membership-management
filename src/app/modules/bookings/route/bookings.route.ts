import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { BookingControllers } from "../controller/bookings.controller";
import { CreateBookingSchema } from "../validation/bookings.validation";

const router = Router();

// TODO => Find only yourself
router.route("/create").post(
  // ✅ Auth Guard
  authGuard("admin", "trainee"),

  // ✅ Sanitize client data
  sanitizeClientDataViaZod(CreateBookingSchema),

  // ✅ Create booking
  BookingControllers.createBooking,
);

router.route("/").get(BookingControllers.getAllBookingClass);

export const BookingRoutes = router;
