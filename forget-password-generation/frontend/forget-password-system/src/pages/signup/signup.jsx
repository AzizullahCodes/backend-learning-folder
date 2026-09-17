import axios from 'axios'
import React, { useState } from 'react'

const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    // signup Handler
    const signupHandler = async()=>{
        console.log(name,email,password)
        let obj = {
            name,
            email,
            password
        }
        try{
            let apiUrl = 'http://localhost:5050/signup'
            let res = await axios({
                url : apiUrl,
                method : 'POST',
                data : obj
            })
            if(res){
                console.log(res.data.status)
                if(res.data.status === true){
                    alert('new user signed up successfully')
                }
            }
        }
        catch(error){
            console.log('error while sign up new user', error)
        }

    }
  return (
    <div>
        <h1>sign up now</h1>
        <input
        type='text'
        placeholder='Enter your name'
        value={name} 
        onChange={(e)=>setName(e.target.value)}
        autoComplete='new-name'/><br/>

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

        <button onClick={signupHandler}>sign up</button>


    </div>
  )
}

export default Signup