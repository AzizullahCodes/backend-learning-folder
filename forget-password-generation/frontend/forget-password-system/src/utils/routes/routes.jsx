import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import Signup from '../../pages/signup/signup';
import ForgotPassword from '../../pages/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/resetPassword/resetPassword';
import VerifyOtp from '../../pages/verifyOtp/verifyOtp';
const AppRoutes = () => {
  return (
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgotPassword' element={<ForgotPassword/>}/>
    <Route path='/resetPassword' element={<ResetPassword/>}/>
    <Route path='/verifyOtp' element={<VerifyOtp/>}/>
   </Routes>
  )
}

export default AppRoutes