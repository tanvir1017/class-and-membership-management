import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { BookingsService } from "../service/bookings.service";

const createBooking = asyncHandler(async (req, res) => {
  const { classId } = req.body;
  const trainee = req.cookies;
  const booking = await BookingsService.enrollTrainee(classId, trainee);

  sendResponse(res, {
    statuscode: StatusCodes.OK,
    success: true,
    message: `Trainee has been successfully enrolled in class ${classId}.`,
    data: booking,
  });
});

// get all booking class
export const getAllBookingClass = asyncHandler(async (req, res) => {
  const booking = await BookingsService.getAllBookingClass();

  sendResponse(res, {
    statuscode: StatusCodes.OK,
    success: true,
    message: "All booking classes have been successfully retrieved.",
    data: booking,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookingClass,
};
