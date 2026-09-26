import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket = io("http://localhost:5052",{autoConnect : false});

const App = ()=>{
  const [input,setInput] = useState('');
  const [allMessages,setAllMessages] = useState([])

  const addMessage = ()=>{
    socket.emit('private_messages',{
      to : 'user_2',
      message : input
    })

    //setAllMessages 
    setAllMessages((prevMessage)=>[
      ...prevMessage,{
        from : 'user_1',
        to : 'user_2',
        message : input
      }
    ])
  }

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

    //read messages from coming backend and backend is receiving from frontend 
    socket.on('read-messages',(msgData)=>{
      console.log('message data is......',msgData)


      //setAllMessages state 
    setAllMessages((prev)=>[
      ...prev,{
        from : msgData?.from,
        to : '',
        message : msgData?.message
      }
    ])
    })

    

  },[])
  return(
   <div>
     <h1>Screen One</h1>
     <input
     value={input}
     placeholder='write message'
     onChange={(e)=>setInput(e.target.value)}
     
     />
     <button onClick={addMessage}>Add</button>

     <ul>
      {
        allMessages?.map((item,index)=>{
          return <li key={index}>{item.message}</li>
        })
      }
     </ul>
   </div>
    
  )
}
export default App;