import express from "express";
import {
  authencticationLogin,
  register,
  logout
} from "../Controllers/AuthController.js";
import {
  validateLogin,
  validateRegister,
} from "../Middlewares/AuthMiddleware.js";
import rateLimit from "express-rate-limit";
import accessValidation from "../Middlewares/AccessValidation.js";
export const authRouter = express.Router();

const loginLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // membatasi permintaan login sebanyak 100 setiap 15 menit
  message: "Too many requests from this IP, please try again in 15 minutes",
});

authRouter.post("/register", validateRegister, register);
authRouter.post(
  "/auth/login",
  loginLimitter,
  validateLogin,
  authencticationLogin
);
authRouter.post('/auth/logout', accessValidation ,logout);