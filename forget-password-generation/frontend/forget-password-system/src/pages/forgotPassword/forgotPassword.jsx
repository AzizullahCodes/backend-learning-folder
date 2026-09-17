import axios from 'axios'
import React, { useState } from 'react'

const ForgotPassword = () => {
    
    const [password,setPassword] = useState('')

    // signup Handler
    const loginHandler = async()=>{
        let obj = {
           
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
        <h1>Forgot password</h1>
        
        
         <input
        type='password'
        placeholder='Enter password'
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        autoComplete='new-password'/><br/>

        <button onClick={loginHandler}>login</button>

        <a href="/">Forgot password</a>


    </div>
  )
}

export default ForgotPassword