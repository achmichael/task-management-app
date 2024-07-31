import { ResponseError } from "../Config/Error.js";
import UserRepository from "../Repositories/UserRepository.js";
import { clearWhiteSpace } from "../Middlewares/AuthMiddleware.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

class ValidateResetPassword {

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(id, token) {

    if (!id || !token) {
      return new ResponseError(400, "Missing required parameters");
    }

    const resetToken = await this.userRepository.getUserResetToken(id);

    if (!resetToken) {
      return new ResponseError(400, "Expired reset token");
    }

    if (
      !crypto.createHash("sha256").update(token).digest("hex") ===
      resetToken.token
    ) {
      return new ResponseError(400, "Invalid reset token");
    }

    return true;
  }
}

class ResetPassword {

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(token, id, newPassword, next) {
    if (!token || !id || !newPassword) {
      return next(new ResponseError(400, "Missing required requests body"));
    }

    if (
      !clearWhiteSpace(token) ||
      !clearWhiteSpace(newPassword) ||
      !clearWhiteSpace(id)
    ) {
      return next(new ResponseError(400, "Invalid inputs"));
    }

    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      return next(new ResponseError(400, "User Not Found"));
    }

    const resetToken = await this.userRepository.getUserResetToken(id);

    if (!resetToken) {
      return next(new ResponseError(400, "Expired reset token"));
    }
    //buat dengan algoritma sha256 untuk meningkatkan tingkat keamanan
    if (
      !crypto.createHash("sha256").update(token).digest("hex") ===
      resetToken.token
    ) {
      return next(new ResponseError(400, "Invalid reset token"));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      await this.userRepository.updatePasswordUser(
        existingUser.id,
        hashedPassword
      );

      await this.userRepository.deleteResetPasswordToken(resetToken.id);

      return true;
    } catch (error) {
      console.log(error);
      return new ResponseError(500, error);
    }
  }
}
export { ValidateResetPassword, ResetPassword };
