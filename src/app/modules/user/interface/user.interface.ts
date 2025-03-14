import mongoose from "mongoose";
import { T_GENDER_COMMON__TYPE } from "../../../interface/common/common.type";
import { USER_ROLE } from "../constant/user.constant";

export interface TUser {
  name: {
    firstName: string;
    lastName: string;
  };
  profileImg: string;
  gender: T_GENDER_COMMON__TYPE;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: "admin" | "trainer" | "trainee";
  isDeleted: boolean;
}

export interface UserModel extends mongoose.Model<TUser> {
  isUserExistByEmail: (email: string) => Promise<TUser>;

  isPasswordMatched: (
    plainPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;

  isJWTIssuedBeforePasswordChange: (
    passwordChangeTimeStamp: Date,
    jwtIssuedIAT: number,
  ) => boolean;
}

export type WithName = {
  name: {
    firstName: string;
    lastName: string;
  };
};

export type TUserRole = keyof typeof USER_ROLE;
