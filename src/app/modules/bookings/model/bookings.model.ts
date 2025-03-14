import mongoose, { Schema } from "mongoose";
import { IBooking } from "../interface/bookings.interface";

const BookingSchema = new Schema<IBooking>(
  {
    classId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ClassSchedule",
    },
    traineeId: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["confirmed", "canceled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
