import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import Signup from '../../pages/signup/signup';
import ForgotPassword from '../../pages/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/resetPassword/resetPassword';
const AppRoutes = () => {
  return (
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgotPassword' element={<ForgotPassword/>}/>
    <Route path='/resetPassword' element={<ResetPassword/>}/>
   </Routes>
  )
}

export default AppRoutes