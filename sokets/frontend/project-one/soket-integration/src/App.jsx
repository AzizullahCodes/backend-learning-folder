import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5050");

const App = () => {
  const [sendMessage,setSendMessage] = useState('')
  

  const submit = () => {
    // console.log(sendMessage)
    socket.emit("msgFromFrontend", sendMessage)
    // socket.emit("msgFromFrontend", "hello i am from frontend");
  };


  useEffect(() => {
  const onConnect = () => {
    console.log('sockent connected...', socket.id)
  }

  const onMsg = (msg) => {
    console.log(msg)
  }

  socket.on('connect', onConnect)
  socket.on("msgFromBackend", onMsg)

  return () => {
    socket.off('connect', onConnect)
    socket.off("msgFromBackend", onMsg)
  }
}, []);
  return (
    <div>
      <h1>socket learning</h1>
      <input type="text"
      placeholder="enter message" 
      value={sendMessage}
      onChange={(e)=>setSendMessage(e.target.value)}
      autoComplete="new-sendMessage"/><br/>
      <button onClick={submit}>submit</button>
    </div>
  );
};

export default App;