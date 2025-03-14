import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import env from "../config";
import AppError from "../errors/appError";
import handleCastError from "../errors/castError";
import handleDuplicity from "../errors/duplicateError";
import handleValidationError from "../errors/validationError";
import handleZodError from "../errors/zodError";
import { TErrorSource } from "../interface/erros/error";

// TODO => Global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, __next) => {
  // TODO  => Default sources
  let statuscode = 500;
  let message = "Something went wrong!";

  let errorSources: TErrorSource[] = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (error instanceof ZodError) {
    const simplifyZodError = handleZodError(error);

    statuscode = simplifyZodError?.statusCode;
    message = simplifyZodError?.message;
    errorSources = simplifyZodError?.errorSources;
  } else if (error?.name === "ValidationError") {
    const simplifyValidationError = handleValidationError(error);

    statuscode = simplifyValidationError?.statusCode;
    message = simplifyValidationError?.message;
    errorSources = simplifyValidationError?.errorSources;
  } else if (error?.name === "CastError") {
    const simplifyValidationError = handleCastError(error);

    statuscode = simplifyValidationError?.statusCode;
    message = simplifyValidationError?.message;
    errorSources = simplifyValidationError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifyValidationError = handleDuplicity(error);

    statuscode = simplifyValidationError?.statusCode;
    message = simplifyValidationError?.message;
    errorSources = simplifyValidationError?.errorSources;
  } else if (error instanceof AppError) {
    statuscode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    statuscode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  return res.status(statuscode).json({
    success: false,
    message,
    errorSources,
    //error,
    stack: env.isProd ? null : error?.stack, // is env === dev then it will print error
  });
};

export default globalErrorHandler;
