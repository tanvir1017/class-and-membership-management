import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Creates a JWT token using the provided payload, secret, and expiration time.
 * @param jwtPayload - The payload to be included in the JWT token.
 * @param TOKEN - The secret used to sign the JWT token.
 * @param EXPIRES_IN - The expiration time for the JWT token in seconds.
 *
 * @returns The JWT token created using the provided payload, secret, and expiration time.
 */

export const createToken = (
  jwtPayload: JwtPayload,
  TOKEN: string,
  EXPIRES_IN: string,
) => {
  return jwt.sign(jwtPayload, TOKEN, {
    expiresIn: EXPIRES_IN,
  });
};

/**
 * Verifies a JWT token using a provided secret.
 *
 * @param token - The JWT token to verify.
 * @param secret - The secret used to sign the JWT token.
 *
 * @returns The decoded payload of the JWT token.
 *
 * @throws Will throw an error if the token is invalid or expired.
 */
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
