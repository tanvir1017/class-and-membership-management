import mongoose from "mongoose";
import { TErrorSource, TReturnError } from "../interface/erros/error";

const handleCastError = (error: mongoose.Error.CastError): TReturnError => {
  const statusCode = 400;
  const errorSources: TErrorSource[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleCastError;
