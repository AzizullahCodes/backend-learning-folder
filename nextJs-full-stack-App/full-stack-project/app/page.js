'use client'
import React, { useState } from "react";
import axios from "axios";
const Home = ()=>{
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('')

  //createUserHandler function
  const createUserHandler = async () => {
  try {
    const apiUrl = '/api/test/create/newUser'

    if (!userName || !email || !password || !role) {
      alert('plz enter required data')
      return
    }

    const res = await axios({
      url: apiUrl,
      method: 'POST',
      data: { userName, email, password, role }
    })

    console.log('new user data stored in mongodb', res.data)
    alert(res.data.message)
  } catch (error) {
    console.log('Error while creating new user....', error)
    alert(error.response?.data?.message || 'Something went wrong')
  }
}
  return(
    <div>
      <h1>Welcome to next js</h1>
      <input 
      type='text'
      placeholder="Enter your name"
      value={userName}
      onChange={(e)=>setUserName(e.target.value)}
      /> <br/>

      <input 
      type='email'
      placeholder="Enter your email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      /> <br/>


      <input 
      type='password'
      placeholder="Enter your password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      /> <br/>


      <input 
      type='text'
      placeholder="Enter your role trainer or student"
      value={role}
      onChange={(e)=>setRole(e.target.value)}
      /> <br/>

<button onClick={createUserHandler}>create user</button>
    </div>
  )
}
export default Home