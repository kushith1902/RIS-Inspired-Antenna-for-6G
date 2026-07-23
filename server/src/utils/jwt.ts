import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRole } from "@spotify-clone/shared";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const generateTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m"
  });

  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d"
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
};
