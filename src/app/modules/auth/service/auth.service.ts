import { StatusCodes } from "http-status-codes";
import env from "../../../config";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { TLoginUser } from "../interface/auth.interface";
import { createToken, verifyToken } from "../utils/auth.utils";

// TODO: Implement function to validate user credentials
const loginValidateUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "user doesn't exist");
  }

  //* check if password is matched or not
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "wrong credentials!");
  }

  //* access granted and return token to client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = createToken(
    jwtPayload,
    env.JWT_ACCESS_TOKEN as string,
    env.JWT_ACCESS_EXPIRES_IN as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    env.JWT_REFRESH_TOKEN as string,
    env.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// TODO => Refresh token generation
const refreshTokenGenerate = async (token: string) => {
  //* Verify token

  const decoded = verifyToken(token, env.JWT_REFRESH_TOKEN);

  const { userEmail, iat } = decoded;

  const user = await User.isUserExistByEmail(userEmail);

  //* check if user exists in DB by id
  if (!user || user.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, "user doesn't exist");
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    name: user.name,
  };
  const accessToken = createToken(
    jwtPayload,
    env.JWT_ACCESS_TOKEN!,
    env.JWT_ACCESS_EXPIRES_IN!,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginValidateUser,
  refreshTokenGenerate,
};
