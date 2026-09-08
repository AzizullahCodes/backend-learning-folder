'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Signup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

   // Add user function
  const addUserFun = async () => {
    let apiUrl = 'http://localhost:5050/signup';
    try {
      let res = await axios.post(apiUrl, { email, password });
      if (res.status === 200) {
        console.log('User added successfully');
        setEmail('');
        setPassword('')
        
      }
    } catch (error) {
      console.log('Error while adding new user:', error);
    }
  };


  return (
    <div>
      <h1>signup</h1>
      <input 
      type='email'
      placeholder='Enter your email'
      onChange={(e)=>setEmail(e.target.value)}
      value={email}/><br/>
       <input 
      type='password'
      placeholder='Enter your password'
      onChange={(e)=>setPassword(e.target.value)}
      value={password}/><br/>
      <button onClick={addUserFun}>add user</button>
    </div>
  )
}

export default Signup