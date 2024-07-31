import express from 'express';
import { forgot_password, validate_reset_password, reset_password } from '../Controllers/AuthController.js';
export const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post('/', forgot_password);