import { useState } from 'react';
import { LandingPage } from './views/LandingPage.jsx';
import LoginPage from './views/LoginPage.jsx';
import RegisterPage from './views/RegisterPage.jsx';
import Dashboard from './views/Dashboard.jsx';
import CalendarPage from './views/Kalender.jsx';
import ResetPassword from './views/ResetPassword.jsx';
import ResendVerificationCode from './views/Resend-VerificationCode.jsx';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Forgot_Password from './views/Forgot-Password.jsx';
function App() {
  return (
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/auth/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/calendar' element={<CalendarPage/>}></Route>
        <Route path='/forgot-password' element={<Forgot_Password/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
        <Route path='/resend-verification-code' element={<ResendVerificationCode/>}></Route>
      </Routes>
  )
}

export default App
