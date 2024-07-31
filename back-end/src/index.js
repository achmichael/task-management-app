import express from "express";
import cors from "cors";
import { authRouter } from "./Routes/AuthRouter.js";
import { errorHandler } from "./Middlewares/ErrorHandler.js";
import { taskRouter } from "./Routes/TaskRouter.js";
import { eventRouter } from "./Routes/EventRouter.js";
import { taskUserRouter } from "./Routes/TaskUser.js";
import { forgotPasswordRouter } from "./Routes/ForgotPasswordRouter.js";
import { resendVerificationCodeRouter } from "./Routes/VerificationCodeRouter.js";
import { resetPasswordRouter } from "./Routes/ResetPasswordRouter.js";
import './Config/Schedule.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;  

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173' // untuk mengatasi cors pada saat terjadi fetch data dari react 
}))
//Authentication Router
app.use('/api', authRouter);
//Forgot-Password Router
app.use('/api/user/forgot-password', forgotPasswordRouter);
//Resend Verification Code To User Email Address
app.use('/api/user/resend-verification-code', resendVerificationCodeRouter);
//Resett Password Router
app.use('/api/user/reset-password', resetPasswordRouter);
//Tasks Router
app.use('/api/tasks', taskRouter);
//Tasks User Router
app.use('/api/user/tasks', taskUserRouter);
//Events User Router
app.use('/api/user/events', eventRouter);
//Middleware Error Handling
app.use(errorHandler);

app.listen(port, function () {
    console.log(`Server Running on port ${port}`);
})

