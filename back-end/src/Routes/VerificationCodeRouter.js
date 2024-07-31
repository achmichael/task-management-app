import express from 'express';
import { resendVerificationCode } from '../Controllers/AuthController.js';

export const resendVerificationCodeRouter = express.Router();

resendVerificationCodeRouter.post('/', resendVerificationCode);