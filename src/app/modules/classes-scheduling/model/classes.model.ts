import mongoose, { Schema } from "mongoose";
import { ClassStatus } from "../constant/classes.constant";
import * as IClassesInterface from "../interface/classes.interface";

// Define the ClassSchedule Schema
const classScheduleSchema = new mongoose.Schema<
  IClassesInterface.IClassSchedule,
  IClassesInterface.ClassScheduleModel
>(
  {
    name: {
      type: String,
      required: [true, "Class name is required"],
      maxlength: [200, "Class name cannot exceed 200 characters"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Class date and time are required"],
    },
    trainer: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    maxTrainees: {
      type: Number,
      default: 10,
      max: [10, "A class cannot exceed 10 trainees"],
    },
    status: {
      type: String,
      enum: Object.values(ClassStatus),
      default: ClassStatus.OPEN,
    },
    startTime: {
      type: String,
      required: [true, "Class start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "Class end time is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create and export the ClassSchedule model
export const ClassSchedule = mongoose.model<
  IClassesInterface.IClassSchedule,
  IClassesInterface.ClassScheduleModel
>("ClassSchedule", classScheduleSchema);
