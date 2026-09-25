import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket = io("http://localhost:5052",{autoConnect : false});

const App = ()=>{
  const [input,setInput] = useState('');
  const [allMessages,setAllMessages] = useState([])

  const addMessage = ()=>{
    socket.emit('private_messages',{
      to : 'user_1',
      message : input
    })
  }

  useEffect(()=>{
    socket.connect()
  
    socket.on('connect',(uid)=>{
      console.log(`socket connected successfully and socket id is ${socket.id}`)
     
    //registering user 
    socket.emit('register','user_2');
    })

    socket.on('n',(iu)=>{
      console.log(`data coming from backend is ${iu}`)
    })

  },[])
  return(
   <div>
     <h1>Screen Two</h1>
     <input
     value={input}
     placeholder='write message'
     onChange={(e)=>setInput(e.target.value)}
     
     />
     <button onClick={addMessage}>Add</button>
   </div>
    
  )
}
export default App;