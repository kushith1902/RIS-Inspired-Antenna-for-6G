import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().transform(Number).default("5000"),
  DATABASE_URL: z.string().default("postgresql://spotify_admin:SecretPassword123!@localhost:5432/spotify_db?schema=public"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  JWT_ACCESS_SECRET: z.string().default("super_secret_access_key_spotify_2026_999"),
  JWT_REFRESH_SECRET: z.string().default("super_secret_refresh_key_spotify_2026_888"),
  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("7d"),
  CLIENT_ORIGIN: z.string().default("http://localhost:3000"),
  AWS_REGION: z.string().default("us-east-1"),
  AWS_S3_BUCKET: z.string().default("spotify-clone-media-bucket"),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional()
});

export const env = envSchema.parse(process.env);
