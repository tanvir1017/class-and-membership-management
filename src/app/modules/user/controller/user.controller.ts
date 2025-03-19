import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "../service/user.service";

// get single user
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserFromDbById(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  const result = await UserServices.getMeFromDB(token as string);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

// get single user by mail
const getSingleUserByMail = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getUserFromDbByEmail(email);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

// create admin
const createUser = asyncHandler(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

// create trainee
const createTrainee = asyncHandler(async (req, res) => {
  const result = await UserServices.createTraineeIntoDB(req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Trainee is created successfully",
    data: result,
  });
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is update successfully",
    data: result,
  });
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDb(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: result,
  });
});

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb();

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "users retrieve successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

// Todo => Get me route
const changeRole = asyncHandler(async (req, res) => {
  const result = await UserServices.changeRole(req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: `User role is changed to ${req.body.role} `,
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  createTrainee,
  getAllUsers,
  deleteUser,
  getSingleUser,
  getSingleUserByMail,
  changeRole,
  getMe,
};
