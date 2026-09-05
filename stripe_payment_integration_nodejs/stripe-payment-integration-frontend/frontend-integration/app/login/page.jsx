'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation' // Added router

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter(); // Initialize router

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
      let myRequiredToken = res?.data?.token;

      if (res.status === 200 && myRequiredToken) {
        // Set cookie maxAge to 60 seconds (1 minute)
        setCookie('myToken', myRequiredToken, { maxAge: 60, path: '/' });

        console.log('User logged in successfully');
        
        setEmail('');
        setPassword('');

        // Smooth redirect to home
        router.push('/');
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