import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/appError";
import { TUser } from "../interface/user.interface";
import { User } from "../model/user.model";

// TODO =>  get individual information by them self
const getAllUsersFromDb = async () => {
  const allUsers = User.find();
  return allUsers;
};

// TODO =>  get individual information by them self
const getUserFromDbById = async (id: string) => {
  const allUsers = User.findById(id);
  return allUsers;
};

// TODO =>  get individual information by them self
const getUserFromDbByEmail = async (email: string) => {
  const result = User.findOne({ email });
  return result;
};

// TODO: Create user record in DB
const createTraineeIntoDB = async (payload: TUser) => {
  const { role } = payload;

  if (role !== "trainee") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You can't create a user with this role",
    );
  } else {
    const result = await User.create(payload);
    return result;
  }
};

// TODO: Create trainee record in DB
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  if (!Object.keys(payload).length) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Request body  is empty");
  }
  const { name, isDeleted, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDb = async (id: string) => {
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Id must be provided");
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// TODO => change user status from admin only
const changeRole = async (payload: Pick<TUser, "email" | "role">) => {
  if (!payload.email) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Id must be provided");
  }
  const result = await User.findOneAndUpdate(
    { email: payload.email },
    { role: payload.role },
    { new: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  createTraineeIntoDB,
  getAllUsersFromDb,
  updateUserIntoDB,
  deleteUserFromDb,
  getUserFromDbById,
  getUserFromDbByEmail,
  changeRole,
};
