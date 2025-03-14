import mongoose, { Schema } from "mongoose";

export interface IBooking {
  classId: mongoose.Schema.Types.ObjectId;
  traineeId: mongoose.Schema.Types.ObjectId[];
  status: "confirmed" | "canceled"; // Future flexibility for cancellations
  createdAt: Date;
}

export type TClassSchedule = {
  _id: Schema.Types.ObjectId;
  name: string;
  date: string;
  trainer: Schema.Types.ObjectId[];
  maxTrainees: number;
  trainees: Schema.Types.ObjectId[];
  status: "open" | "closed" | "cancelled";
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
};
