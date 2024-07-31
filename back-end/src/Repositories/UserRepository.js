import { PrismaClient } from "@prisma/client";
import { ResponseError } from "../Config/Error.js";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://root:@localhost:3306/task_management",
    },
  },
});

export default class UserRepository {
  async createUser(user) {
    return await prisma.user.create({
      data: user.data(),
    });
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateVerificationCode(email, verification_code) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new ResponseError("User not found");
    }
    return await prisma.user.update({
      where: { email: email },
      data: { verification_code: verification_code },
    });
  }

  async setVerified(email, isVerified) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new ResponseError("User not found");
    }
    return await prisma.user.update({
      where: { email: email },
      data: { isVerified: isVerified },
    });
  }

  async savePasswordResetToken(userId, token, expiredIn) {
    return await prisma.resetPasswordToken.create({
      data: {
        userId: userId,
        token: token,
        expiresAt: new Date(expiredIn),
      },
    });
  }

  async getUserResetToken(userId) {
    return await prisma.resetPasswordToken.findFirst({
      where: {
        userId: parseInt(userId),
        expiresAt: {
          gte: new Date(),
        },
      },
    });
  }

  async updatePasswordUser(userId, newPassword) {
    return await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        password: newPassword,
      },
    });
  }

  async deleteResetPasswordToken(resetTokenId) {
    return await prisma.resetPasswordToken.delete({
      where: {
        id: parseInt(resetTokenId),
      },
    });
  }

  async getUserById(userId) {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
  }
}
