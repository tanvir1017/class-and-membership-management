import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { IClassSchedule } from "../interface/classes.interface";
import { ClassSchedule } from "../model/classes.model";
import {
  convertDateFormat,
  createClassDateTimes,
} from "../utils/classes.utils";

const getAllClassSchedules = async () => {
  const result = await ClassSchedule.find(); //.populate("trainer");
  return result;
};

const createClassScheduleIntoDB = async (payload: IClassSchedule) => {
  const { date, startTime, endTime, ...rest } = payload;

  // Convert date from dd-mm-yyyy to yyyy-mm-dd format
  const classDate = convertDateFormat(date as string);

  // getting start and end time in Date format
  const { startDateTime, endDateTime } = createClassDateTimes(
    classDate,
    startTime,
    endTime,
  );

  // Check if the duration is exactly 2 hours (120 minutes)
  const durationInMilliseconds =
    endDateTime.getTime() - startDateTime.getTime();
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

  if (durationInHours !== 2) {
    throw new Error("The class duration must be exactly 2 hours.");
  }

  // Validate that the end time is after the start time
  if (endDateTime <= startDateTime) {
    throw new Error("End time must be after start time");
  }

  // Check for conflicts with existing schedules (make sure no more than 5 classes per day)
  const existingClasses = await ClassSchedule.find({
    date: classDate,
  });

  // Check if there are already 5 classes scheduled for the day
  if (existingClasses.length >= 5) {
    throw new AppError(
      StatusCodes.BAD_GATEWAY,
      "A maximum of 5 classes can be scheduled per day",
    );
  }

  // Create the new class schedule in the database
  const result = await ClassSchedule.create({
    date: classDate,
    startTime: startDateTime,
    endTime: endDateTime,
    ...rest,
  });

  return result;
};

// Assign trainers to a class schedule
const assignTrainersIntoClassSchedule = async (
  classId: string,
  trainerIds: string[],
) => {
  // Convert trainerIds to ObjectId format
  const trainerObjectIds = trainerIds.map((id) => new Types.ObjectId(id));

  // Check if the class exists
  const classSchedule = await ClassSchedule.findById(classId);
  if (!classSchedule) {
    throw new AppError(StatusCodes.NOT_FOUND, "Class schedule not found");
  }

  // Check if the trainers exist in the User collection
  const existingTrainers = await User.find({
    _id: { $in: trainerObjectIds },
  });

  if (existingTrainers.length !== trainerIds.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "One or more trainers not found");
  }

  console.log(classSchedule.trainer);
  // Prevent duplicate trainer assignments
  const uniqueTrainers = [
    ...new Set([...(classSchedule.trainer as any), ...trainerObjectIds]),
  ];

  // Limit the number of trainers (e.g., max 2)
  if (uniqueTrainers.length > 2) {
    throw new AppError(
      StatusCodes.BAD_GATEWAY,
      "A class can have a maximum of 2 trainers.",
    );
  }

  // Update the class with the new trainers
  classSchedule.trainer = uniqueTrainers as any;
  await classSchedule.save();

  return {
    classSchedule,
  };
};

export const ClassScheduleService = {
  createClassScheduleIntoDB,
  assignTrainersIntoClassSchedule,
  getAllClassSchedules,
};
