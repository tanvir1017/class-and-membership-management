import bcrypt from "bcrypt";
import mongoose, { model } from "mongoose";

import env from "../../../config";
import {
  T_GENDER_COMMON__TYPE,
  TUserName,
} from "../../../interface/common/common.type";
import * as TUserInterface from "../interface/user.interface";

const userNameSchema = new mongoose.Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "First name can not be more than 20 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Last name can not be more than 20 characters"],
  },
});

export const Gender: T_GENDER_COMMON__TYPE[] = ["male", "female", "others"];

const UserSchema = new mongoose.Schema<
  TUserInterface.TUser,
  TUserInterface.UserModel
>(
  {
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should not be less than 6 character"],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "trainer", "trainee"],
        message: "{VALUE} is not a valid role",
      },
    },
    profileImg: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  // Optional Properties for @createdAt and @updatedAt properties
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function (next) {
  // TODO => hashing password before saving
  const user = this; // this refers to the document
  user.password = await bcrypt.hash(
    user.password,
    Number(env.BCRYPT_SALT_ROUNDS),
  );

  next();
});

// TODO => Implement pre middleware for find, findOne and aggregate
UserSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

UserSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

UserSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// TODO => Implement static method for user exist or not
UserSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

// TODO => Implement static method for check password matched
UserSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// TODO => check if the iat of jwt is issued before password change
UserSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangeTimeStamp: Date,
  jwtIssuedIAT: number,
) {
  const passwordChangedAtInTime =
    new Date(passwordChangeTimeStamp).getTime() / 1000;
  return passwordChangedAtInTime > jwtIssuedIAT;
};

export const User = model<TUserInterface.TUser, TUserInterface.UserModel>(
  "User",
  UserSchema,
);
