import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";
import path from "path";

// Declaring path for specific .env files
dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: num(),
  BCRYPT_SALT_ROUNDS: num(),
  JWT_ACCESS_EXPIRES_IN: str(),
  JWT_REFRESH_EXPIRES_IN: str(),
  ADMIN_PASSWORD: str(),
  JWT_ACCESS_TOKEN: str(),
  JWT_REFRESH_TOKEN: str(),
  DATABASE_URL: str(),
});

export default env;
