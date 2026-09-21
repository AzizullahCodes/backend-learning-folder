// // import React, { useEffect, useState } from "react";
// // import { io } from "socket.io-client";

// // const socket = io("http://localhost:5050");

// // const App = () => {
// //   const [sendMessage,setSendMessage] = useState('')
// //   const [data,setData] = useState([])
  

// //   const submit = () => {
// //     // console.log(sendMessage)
// //     socket.emit("msgFromFrontend", sendMessage)
// //     // socket.emit("msgFromFrontend", "hello i am from frontend");
// //   };


// //   useEffect(() => {
// //   const onConnect = () => {
// //     console.log('sockent connected...', socket.id)
// //   }

// //   const onMsg = (msg) => {
    
    
// //   }

// //   socket.on('connect', onConnect)
// //   socket.on("msgFromBackend", onMsg)

// //   return () => {
// //     socket.off('connect', onConnect)
// //     socket.off("msgFromBackend", onMsg)
// //   }
// // }, []);
// //   return (
// //     <div>
// //       <h1>socket learning</h1>
// //       <input type="text"
// //       placeholder="enter message" 
// //       value={sendMessage}
// //       onChange={(e)=>setSendMessage(e.target.value)}
// //       autoComplete="new-sendMessage"/><br/>

// //       <button onClick={submit}>submit</button>
// //       {
// //         data?.map((item)=>{
// //           return <li>{item}</li>
// //         })
// //       }
// //     </div>
// //   );
// // };

// // export default App;




// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// export default function App() {
//   const socketRef = useRef(null);
//   const [username, setUsername] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const socket = io("http://localhost:4000");
//     socketRef.current = socket;

//     socket.on("chat:message", (msg) =>
//       setMessages((prev) => [...prev, { type: "chat", ...msg }])
//     );
//     socket.on("system", (text) =>
//       setMessages((prev) => [...prev, { type: "system", text }])
//     );

//     return () => socket.disconnect();
//   }, []);

//   const handleJoin = (e) => {
//     e.preventDefault();
//     if (!username.trim()) return;
//     socketRef.current.emit("join", username.trim());
//     setJoined(true);
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     socketRef.current.emit("chat:message", input);
//     setInput("");
//   };

//   if (!joined) {
//     return (
//       <form onSubmit={handleJoin} style={{ maxWidth: 320, margin: "80px auto" }}>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Apna naam likho"
//         />
//         <button type="submit">Join</button>
//       </form>
//     );
//   }

//   return (
//     <div style={{ maxWidth: 480, margin: "40px auto" }}>
//       <div style={{ height: 360, overflowY: "auto", border: "1px solid #ccc", padding: 12 }}>
//         {messages.map((m, i) =>
//           m.type === "system" ? (
//             <p key={i} style={{ textAlign: "center", color: "#888" }}>{m.text}</p>
//           ) : (
//             <p key={i}>
//               <b>{m.user}:</b> {m.text}
//             </p>
//           )
//         )}
//       </div>

//       <form onSubmit={sendMessage} style={{ display: "flex", gap: 8, marginTop: 8 }}>
//         <input
//           style={{ flex: 1 }}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Message likho..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:5050',{autoConnect : false})
const App = ()=>{
  const [message,setMessage] = useState('')
  const [data,setData] = useState([])

  const submit = () => {
    console.log('msg.....',message)
    console.log('Button clicked!');
    socket.emit("read-message" , message);
    setMessage('')
  };

  useEffect(()=>{
    socket.connect()
    socket.on('connect',()=>{
      console.log('socket connected from frontend...',socket.id)

      //
      socket.on('testing', (ms)=>{
        ms && setData((prev)=> [...prev,ms])
      })
    })
  },[])
  return(
    <div>
      <h1>socket integration</h1>
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