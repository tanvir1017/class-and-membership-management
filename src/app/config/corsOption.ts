import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowedOrigin";

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  optionsSuccessStatus: 200, // For older browsers compatibility
};

export default corsOptions;
