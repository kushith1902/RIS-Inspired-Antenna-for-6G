import bcrypt from "bcryptjs";
import { prisma } from "../config/db";
import { generateTokens } from "../utils/jwt";
import { UserRole } from "@spotify-clone/shared";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  displayName: z.string().min(2),
  role: z.nativeEnum(UserRole).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export class AuthService {
  static async register(input: z.infer<typeof registerSchema>) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (existing) {
      throw { statusCode: 400, code: "EMAIL_TAKEN", message: "Email is already registered" };
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        fullName: input.fullName,
        displayName: input.displayName,
        role: input.role || UserRole.FREE_USER,
        emailVerified: true
      }
    });

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole
    });

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, tokens };
  }

  static async login(input: z.infer<typeof loginSchema>) {
    const user = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (!user || !user.passwordHash) {
      throw { statusCode: 401, code: "INVALID_CREDENTIALS", message: "Invalid email or password" };
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw { statusCode: 401, code: "INVALID_CREDENTIALS", message: "Invalid email or password" };
    }

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole
    });

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, tokens };
  }
}
