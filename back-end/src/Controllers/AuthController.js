import { Register } from "../UseCases/Register.js";
import { Login } from "../UseCases/Login.js";
import UserRepository from "../Repositories/UserRepository.js";
import {
  validateEmail,
  clearWhiteSpace,
} from "../Middlewares/AuthMiddleware.js";
import ForgotPassword from "../UseCases/ForgotPassword.js";
import { ResponseError } from "../Config/Error.js";
import {
  ValidateResetPassword,
  ResetPassword,
} from "../UseCases/ResetPassword.js";
import User from "../Models/User.js";
import sendMail from "../Utils/SendMail.js";
import crypto from "crypto";
import { extractToken } from "../Middlewares/AccessValidation.js";
import { PrismaClient } from "@prisma/client";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  const userRepository = new UserRepository();

  const addUser = new Register(userRepository);

  const user = new User(email, password);

  try {
    const result = await addUser.execute(user);
    const verification_code = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();

    await sendMail(
      user.email,
      "Verification Code",
      `Your Verification Code is ${verification_code} please use your verification code for login`
    );

    await userRepository.updateVerificationCode(user.email, verification_code);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for the verification code using for login.",
      user: result,
    });
  } catch (error) {
    console.log(error.stack);
    next(error);
  }
};

export const authencticationLogin = async (req, res, next) => {
  const { email, password, verification_code } = req.body;

  const userRepository = new UserRepository();

  const authentication = new Login(userRepository);

  const user = new User(email, password, verification_code);
  try {
    const token = await authentication.execute(user, req);

    await userRepository.setVerified(user.email, true);

    res.status(200).json({
      message: "Login Successful",
      isVerified: true,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ResponseError(404, "Email Required"));
    }

    if (!clearWhiteSpace(email)) {
      return next(new ResponseError(404, "input cannot contain only spaces"));
    }

    if (!validateEmail(email)) {
      return next(new ResponseError(404, "Invalid Email"));
    }

    const userRepository = new UserRepository();

    const verification_code = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();
    await sendMail(
      email,
      "Verification Code",
      `Your Verification Code Is ${verification_code} please Use the code for login into your account`
    );
    await userRepository.updateVerificationCode(email, verification_code);
    res.status(200).json({
      message: "Verification code has been sent to your email",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const forgot_password = async (req, res, next) => {
  const { email } = req.body;
  try {
    const resetPassword = new ForgotPassword();
    await resetPassword.execute(email);
    res.status(200).json({ message: "Reset password link sent to your email" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validate_reset_password = async (req, res, next) => {
  const { token, id } = req.query;

  try {
    const resetPassword = new ValidateResetPassword();

    const reseted = await resetPassword.execute(id, token);

    if (reseted) {
      res.status(200).json({ message: "Reset password link is valid" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const reset_password = async (req, res, next) => {
  const { token, id, newPassword } = req.body;
  console.log(req.body);
  try {
    const resetPassword = new ResetPassword();

    const reseted = await resetPassword.execute(token, id, newPassword, next);

    if (reseted) {
      res.status(200).json({ message: "Password Reset Successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const prisma = new PrismaClient();
  const { authorization } = req.headers;

  const token = extractToken(authorization, next);

  if (!token) {
    return next(new ResponseError(404, "Unauthorized"));
  }
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    await prisma.blacklistedToken.create({
      data: {
        token: tokenHash,
        expiresAt: new Date(req.user.exp * 1000),
      },
    });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
