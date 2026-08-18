//login
'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { setCookie } from 'cookies-next'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

  // Login user function
  const loginUserFun = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');

    let apiUrl = 'http://localhost:5050/login';

    try {
      let res = await axios.post(apiUrl, { email, password });
      console.log('testing......',res)
      let myRequiredToken = res?.data?.token;
              console.log(myRequiredToken)
                    setCookie('myToken',myRequiredToken,{maxAge: 60*60*3})

      // console.log(res.data.token)
      console.log(myRequiredToken)
      if (res.status === 200) {
        console.log('User logged in successfully');
        window.location.reload()
        
        setEmail('');
        setPassword('');

              

        // Optionally redirect or store token here
        // localStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      console.log('Error while logging in:', error);
      setError(
        error?.response?.data?.message || 'Something went wrong. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type='email'
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      /><br/>

      <input
        type='password'
        placeholder='Enter your password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      /><br/>

      <button onClick={loginUserFun} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  )
}

export default Login