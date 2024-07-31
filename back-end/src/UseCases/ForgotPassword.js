import { ResponseError } from "../Config/Error.js";
import UserRepository from "../Repositories/UserRepository.js";
import { validateEmail } from "../Middlewares/AuthMiddleware.js";
import sendMail from "../Utils/SendMail.js";
import crypto from "crypto";
class ForgotPassword {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(email) {
    if (!email) throw new ResponseError(400, "Email is required");

    if (!validateEmail(email))
      throw new ResponseError(400, "Invalid email format");

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (!existingUser) throw new ResponseError(400, "Email Not Found");

    // Membuat token reset password yang aman
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Membuat hash dari token untuk keamanan tambahan sebelum menyimpannya di database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Mengatur waktu kadaluarsa token (1 jam)
    const resetTokenExpire = Date.now() + 3600000;

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&id=${existingUser.id}`;

    try {
      await this.userRepository.savePasswordResetToken(
        existingUser.id,
        hashedToken,
        resetTokenExpire
      );
      //kirim email ke user
      await sendMail(
        existingUser.email,
        "Reset Password Token",
        "You Requested For Reset Password",
        `<p>Click this <a href="${resetUrl}">link</a> to reset your password</p>`
      );
      
    } catch (error) {
      console.error(error);
      throw new ResponseError(500, error);
    }
  }
}

export default ForgotPassword;
