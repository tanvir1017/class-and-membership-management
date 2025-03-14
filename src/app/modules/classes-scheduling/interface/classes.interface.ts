import mongoose, { Schema } from "mongoose";

// Define interface for the class schedule document
export interface IClassSchedule {
  name: string;
  date: string;
  trainer: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  maxTrainees: number;
  status: "open" | "full" | "closed";
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassScheduleModel extends mongoose.Model<IClassSchedule> {
  isClassFull: (classId: mongoose.Types.ObjectId) => Promise<boolean>;
  isClassAvailableForBooking: (
    classId: mongoose.Types.ObjectId,
  ) => Promise<boolean>;
}
