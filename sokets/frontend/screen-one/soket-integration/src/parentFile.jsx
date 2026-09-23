// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// const ChatScreen = ({ userId, friendId }) => {
//   const socketRef = useRef(null);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]); // [{ from, message }]

//   useEffect(() => {
//     const socket = io("http://localhost:5050");
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log(`${userId} connected:`, socket.id);
//       socket.emit("register", userId);
//     });

//     socket.on("read-messages", ({ message, from }) => {
//       setChat((prev) => [...prev, { from, message }]);
//     });

//     socket.on("user-offline", (msg) => {
//       setChat((prev) => [...prev, { from: "system", message: msg }]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("read-messages");
//       socket.off("user-offline");
//       socket.disconnect();
//     };
//   }, [userId]);

//   const submit = () => {
//     if (!message.trim()) return;

//     socketRef.current.emit("private-msg", {
//       to: friendId,
//       message,
//     });

//     setChat((prev) => [...prev, { from: "me", message }]);
//     setMessage("");
//   };

//   return (
//     <div style={{ border: "1px solid #ccc", padding: 12, width: 280 }}>
//       <h2>I am {userId}</h2>
//       <p>Chatting with: {friendId}</p>

//       <input
//         type="text"
//         placeholder="enter msg"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && submit()}
//       />
//       <button onClick={submit}>Send</button>

//       <ul>
//         {chat.map((item, index) => (
//           <li key={index}>
//             <b>{item.from}:</b> {item.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatScreen;