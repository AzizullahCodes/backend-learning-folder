import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket = io("http://localhost:5052",{autoConnect : false});

const App = ()=>{
  const [input,setInput] = useState('');
  const [allMessages,setAllMessages] = useState([])
  const [editIndex,setEditIndex] = useState(null)
 const [isEdit,setIsEdit] = useState(false)

  const addMessage = ()=>{
    socket.emit('private_messages',{
      to : 'user_1',
      message : input
    })

    //setAllMessages 
    setAllMessages((prevMessage)=>[
      ...prevMessage,{
        from : 'user_2',
        to : 'user_1',
        message : input
      }
    ])

    setInput('')
  }
  //delete message function 
  const deleteHandler = (a)=>{
console.log(a)
console.log(allMessages)
let cloneAllMessages = [...allMessages]
console.log('all message clone is.....', cloneAllMessages)

cloneAllMessages.splice(a,1)
console.log('all messages clone is....',cloneAllMessages)

setAllMessages(cloneAllMessages)
  }

  //editHandler
  const editHandler = (item,index)=>{
    setIsEdit(true)
  setEditIndex(index)
setInput(item.message)
  }

  //updateHandler
  const updateHandler = ()=>{
    if(editIndex == null){
      return
    }
    else{
      // console.log(editIndex)
      // console.log(allMessages[editIndex])
      let obj = allMessages[editIndex]
      // console.log('message is ',obj.message)
      // console.log('new input value is...',input)
      obj.message = input
      // console.log('new object is....',obj)
      let cloneAllMessages = [...allMessages]
      // console.log('clone all messages is....',cloneAllMessages)
      //delete already exist object 
      cloneAllMessages.splice(editIndex,1,obj)
      setAllMessages(cloneAllMessages)
      // console.log('all messages are....',allMessages)

      setIsEdit(false)
      setEditIndex(null)
      setInput('')
      
    }
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
     <h1>Screen Two</h1>
     <input
     value={input}
     placeholder='write message'
     onChange={(e)=>setInput(e.target.value)}
     
     />
     
     
    {isEdit && <button onClick={updateHandler}>update</button>}
    {!isEdit && <button onClick={addMessage}>Add</button>}

     <ul>
      {
        allMessages?.map((item,index)=>{
          return <li key={index}>{item.message}
          <button onClick={()=>deleteHandler(index)}>delete</button>
          
          {item.from == 'user_2' && <button onClick={()=>editHandler(item,index)}>Edit</button>} </li>
        })
      }
     </ul>
   </div>
    
  )
}
export default App;