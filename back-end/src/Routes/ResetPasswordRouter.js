import express from 'express';
import { reset_password, validate_reset_password } from '../Controllers/AuthController.js';

export const resetPasswordRouter = express.Router();

resetPasswordRouter.get('/', validate_reset_password);
resetPasswordRouter.post('/', reset_password);
