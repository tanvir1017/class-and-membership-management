import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { ClassScheduleService } from "../service/classes.service";

// TODO => Creates a new class schedule in the database.
const createClassSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ClassScheduleService.createClassScheduleIntoDB(
      req.body,
    );

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Class scheduled successfully",
      data: result,
    });
  },
);

// TODO => Assign trainers to a class schedule.
const assignTrainersToClass = asyncHandler(
  async (req: Request, res: Response) => {
    const { classId } = req.params;
    const { trainer } = req.body;

    const result = await ClassScheduleService.assignTrainersIntoClassSchedule(
      classId,
      trainer,
    );

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Trainers assigned to class successfully",
      data: result,
    });
  },
);

// TODO => Fetch all class schedules.
const getAllClassSchedules = asyncHandler(
  async (__req: Request, res: Response) => {
    const result = await ClassScheduleService.getAllClassSchedules();

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Class schedules fetched successfully",
      data: result,
    });
  },
);

const getClassScheduleById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ClassScheduleService.createClassScheduleIntoDB(
      req.body,
    );

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Class scheduled successfully",
      data: result,
    });
  },
);
const updateClassSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ClassScheduleService.createClassScheduleIntoDB(
      req.body,
    );

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Class scheduled successfully",
      data: result,
    });
  },
);
const deleteClassSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ClassScheduleService.createClassScheduleIntoDB(
      req.body,
    );

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Class scheduled successfully",
      data: result,
    });
  },
);
export const classScheduleController = {
  createClassSchedule,
  assignTrainersToClass,
  getAllClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
};
