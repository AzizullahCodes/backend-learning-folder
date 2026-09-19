import React from 'react'
import { useEffect } from 'react';
import { io } from 'socket.io-client';
// const socket = io('http://localhost:5050', { autoConnect: false });
const socket = io('http://localhost:5000/',{
  autoConnect : false
})


const App = () => {

  const submit = ()=>{
    console.log('button clicked')
    socket.emit("connect", "hello testing 1234")
  }

  useEffect(()=>{
socket.connect();
socket.on('connect', ()=>{
  console.log('frontend socket connected....', socket.id)
})
  },[])
  return (
    <div>
      <h1>socket learing </h1>
      <button onClick={submit}>submit</button>
    </div>
  )
}

export default App