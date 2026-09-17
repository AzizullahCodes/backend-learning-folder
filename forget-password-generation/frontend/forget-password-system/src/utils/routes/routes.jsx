import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import Signup from '../../pages/signup/signup';
import ForgotPassword from '../../pages/forgotPassword/forgotPassword';
const AppRoutes = () => {
  return (
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgotPassword' element={<ForgotPassword/>}/>
   </Routes>
  )
}

export default AppRoutes