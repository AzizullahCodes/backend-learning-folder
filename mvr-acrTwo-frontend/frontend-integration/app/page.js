'use client'
import React from "react";
import { useState } from "react";
import axios from "axios";
const Home = ()=>{
  const [data,setData] = useState([]);
  const [addUser,setAddUser] = useState('')
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('')
  //add user function from client side to server side
  const addUserFun = async(req,res)=>{
    let apiUrl = 'http://localhost:5050/user/save';

    try{
      let res = await axios({
        url : apiUrl,
        method : 'POST',
        data : {
          userName,
          email,
          password,
          role
        }
      })
 const {status} = res;
 if(status == 200){
  console.log('user added successfully from frontend to server');
  setUserName('');
  setEmail('');
  setPassword('');
  setRole('')
 }

    }
    catch(error){
      console.log('Error while adding new user from frontend to server')
    }
  }
  return(
    <div>
      <h1>Api Integration</h1>
      <input 
      type="text"
      placeholder="Enter userName here"
      value={userName}
      onChange={(e)=>setUserName(e.target.value)}
      autoComplete="new-userName"
       /><br/>

        <input 
      type="email"
      placeholder="Enter email address here"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      autoComplete="new-email"
       /><br/>

        <input 
      type="password"
      placeholder="Enter password here"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      autoComplete="new-password"
       /><br/>

        <input 
      type="text"
      placeholder="Enter your role('student' or 'trainer') here"
      value={role}
      onChange={(e)=>setRole(e.target.value)}
      autoComplete="new-role"
       /><br/>

       <button onClick={addUserFun}>add user</button>
    </div>
  )
}
export default Home