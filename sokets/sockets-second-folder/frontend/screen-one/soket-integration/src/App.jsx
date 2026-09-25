import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket = io("http://localhost:5052",{autoConnect : false});

const App = ()=>{
  const [input,setInput] = useState('');
  const [allMessages,setAllMessages] = useState([])

  useEffect(()=>{
    socket.connect()
  
    socket.on('connect',(uid)=>{
      console.log(`socket connected successfully and socket id is ${socket.id}`)
     
    //registering user 
    socket.emit('register','user_1');
    })

    socket.on('n',(iu)=>{
      console.log(`data coming from backend is ${iu}`)
    })

  },[])
  return(
    <h1>Screen One</h1>
  )
}
export default App;