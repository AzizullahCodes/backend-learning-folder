// ScreenOne.jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function ScreenOne() {
  // Is screen ki pehchan (hardcoded)
  const userId = "user_1";
  const friendId = "user_2";

  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Screen khulte hi socket connect karo
  useEffect(() => {
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    // Connect hone pe server ko apni ID batao
    socket.on("connect", () => {
      console.log(userId + " connected:", socket.id);
      socket.emit("register", userId);
    });

    // Server se message aaya
    socket.on("read-messages", (data) => {
      setChat((prev) => [...prev, { from: data.from, message: data.message }]);
    });

    // Samne wala offline hai
    socket.on("user-offline", (msg) => {
      setChat((prev) => [...prev, { from: "system", message: msg }]);
    });

    // Screen band ho to connection band
    return () => {
      socket.off("connect");
      socket.off("read-messages");
      socket.off("user-offline");
      socket.disconnect();
    };
  }, []);

  // Send button dabane pe
  function submit() {
    if (!message.trim()) return;

    // Server ko message bhejo
    socketRef.current.emit("private-msg", {
      to: friendId,
      message: message,
    });

    // Apni screen pe bhi dikhao
    setChat((prev) => [...prev, { from: "me", message: message }]);
    setMessage("");
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, width: 280 }}>
      <h2>I am {userId}</h2>
      <p>Chatting with: {friendId}</p>

      <input
        type="text"
        placeholder="enter msg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      />
      <button onClick={submit}>Send</button>

      <ul>
        {chat.map((item, index) => (
          <li key={index}>
            <b>{item.from}:</b> {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScreenOne;