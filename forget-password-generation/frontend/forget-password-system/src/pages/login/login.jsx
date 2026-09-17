import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigateTo = useNavigate('')

    // signup Handler
    const loginHandler = async()=>{
        let obj = {
            email,
            password
        }
        
        try{
            let apiUrl = 'http://localhost:5050/login'
            let res = await axios({
                url : apiUrl,
                method : 'POST',
                data : obj
            })
           if(res.data.status === true){
            console.log('you have logged in successfully')
           }
        }
        catch(error){
            console.log('error while login', error)
        }

    }
  return (
    <div>
        <h1>login</h1>
        
         <input
        type='email'
        placeholder='Enter your email'
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        autoComplete='new-email'/><br/>

         <input
        type='password'
        placeholder='Enter password'
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        autoComplete='new-password'/><br/>

        <button onClick={loginHandler}>login</button>

        <a href="/forgotPassword">Forgot password</a>


    </div>
  )
}

export default Login