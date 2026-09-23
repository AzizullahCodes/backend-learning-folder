

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:5050',{autoConnect : false})
const App = ()=>{
  const [message,setMessage] = useState('')
  const [data,setData] = useState([])

  

  useEffect(()=>{
    socket.connect()
    socket.on('connect',()=>{
      console.log('socket connected from frontend...',socket.id)

      //
      socket.on('testing', (ms)=>{
        ms && setData((prev)=> [...prev,ms])
      })
      //saving user
      socket.emit('register','user_2')
      socket.on('read-message',(msgData)=>{
        console.log('message received...',msgData)
      })
    })
  },[])

  const submit = () => {
    console.log('msg.....',message)
    console.log('Button clicked!');
    // socket.emit("read-message" , message);

    //
    socket.emit('private-msg',{
      to : 'user_1',
      message : message
    })
    setMessage('')
  };
  return(
    <div>
      <h1>socket (screen one)</h1>
      <h2>I am user 2</h2>
      <input type="text"
      placeholder="enter msg"
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
       />
       <button onClick={submit}> Submit </button>
      <ul>
         {
      data.map((item,index)=>{
          return <li key={index}>{item}</li>
        })
       }
      </ul>
    </div>
  )
}

export default App