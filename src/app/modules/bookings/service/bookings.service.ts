import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
import env from "../../../config";
import AppError from "../../../errors/appError";
import { verifyToken } from "../../auth/utils/auth.utils";
import { ClassSchedule } from "../../classes-scheduling/model/classes.model";
import { User } from "../../user/model/user.model";
import { TClassSchedule } from "../interface/bookings.interface";
import Booking from "../model/bookings.model";
import { parseClassTime } from "../utils/bookings.utils";

const enrollTrainee = async (classId: string, trainee: JwtPayload) => {
  const storedClassSchedule = await ClassSchedule.findById(classId);

  // Check if the class exists
  if (!storedClassSchedule) {
    throw new AppError(StatusCodes.NOT_FOUND, "Class not found.");
  }

  // Check if the class is open
  if (storedClassSchedule.status !== "open") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Enrollment is closed for this class.",
    );
  }

  const { accessToken } = trainee;
  // Verify the trainee
  const verifyTrainee = verifyToken(
    accessToken,
    env.JWT_ACCESS_TOKEN as string,
  );

  // Check if the user is a trainee
  const traineeInfo = await User.findOne({
    email: verifyTrainee.userEmail,
    role: "trainee",
  }).select("_id");

  // Check if the user is a trainee
  if (traineeInfo === null) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User data not found or are not allowed to enroll.",
    );
  }

  // ✅ Find all existing bookings where this trainee is already booked
  const alreadyBookedTraineeClass = await Booking.find({
    traineeId: { $in: [traineeInfo._id] },
  }).populate("classId");

  // ✅ Check for time overlap
  for (const booking of alreadyBookedTraineeClass) {
    const bookedClass = booking.classId as unknown as TClassSchedule;

    // ✅ Convert dates to comparable Date objects
    const bookedStartTime = new Date(bookedClass.startTime);
    const bookedEndTime = new Date(bookedClass.endTime);
    const newStart = parseClassTime(
      storedClassSchedule.date,
      storedClassSchedule.startTime,
    );
    const newEnd = parseClassTime(
      storedClassSchedule.date,
      storedClassSchedule.endTime,
    );

    // ✅ Ensure both classes are on the same date
    if (
      bookedClass.date.split("T")[0] === storedClassSchedule.date.split("T")[0]
    ) {
      // ✅ Step 3: Check for time overlap
      if (
        (newStart >= bookedStartTime && newStart < bookedEndTime) || // New class starts inside existing class
        (newEnd > bookedStartTime && newEnd <= bookedEndTime) || // New class ends inside existing class
        (newStart <= bookedStartTime && newEnd >= bookedEndTime) // New class fully overlaps existing class
      ) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Trainee is already booked for another class at the same time.",
        );
      }
    }
  }

  const existingBooking = await Booking.findOne({ classId });

  // check if the trainee is already booked for this class
  if (existingBooking) {
    // Check if the class has space
    const totalBookings = existingBooking?.traineeId.length;

    if (totalBookings >= 2) {
      throw new AppError(
        StatusCodes.BAD_GATEWAY,
        "Class is full. No more trainees can be added.",
      );
    }

    // Check if the trainee is already booked for this class
    const isTraineeExist = existingBooking?.traineeId.includes(
      traineeInfo._id as unknown as Schema.Types.ObjectId,
    );

    if (isTraineeExist) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Trainee is already booked for this class.",
      );
    }

    // Create a new booking
    existingBooking.traineeId = [
      ...existingBooking.traineeId,
      traineeInfo,
    ] as unknown as Schema.Types.ObjectId[];

    const result = await existingBooking.save();
    return result;
  } else {
    // Create a new booking
    const booking = await Booking.create({ classId, traineeId: traineeInfo });

    return "booking";
  }
};

// get all booking class
export const getAllBookingClass = async () => {
  const booking = await Booking.find().populate("classId");
  // .populate("traineeId");

  return booking;
};

export const BookingsService = {
  enrollTrainee,
  getAllBookingClass,
};
