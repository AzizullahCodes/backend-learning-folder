import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatScreen = ({ userId, friendId }) => {
  const storageKey = `chat_${userId}`;
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");

  // 1) Pehli baar render pe localStorage se history load
  const [chat, setChat] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2) Jab bhi chat badle, localStorage mai save
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(chat));
    } catch (err) {
      console.error("localStorage save failed:", err);
    }
  }, [chat, storageKey]);

  // 3) Socket connection
  useEffect(() => {
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log(`${userId} connected:`, socket.id);
      socket.emit("register", userId);
    });

    // Receive: message DB (localStorage) wali list mai add
    socket.on("read-messages", ({ message, from }) => {
      const newMsg = { from, to: userId, message, time: Date.now() };
      setChat((prev) => [...prev, newMsg]);
    });

    // System message sirf screen pe, save nahi karna
    socket.on("user-offline", (msg) => {
      alert(msg);
    });

    return () => {
      socket.off("connect");
      socket.off("read-messages");
      socket.off("user-offline");
      socket.disconnect();
    };
  }, [userId]);

  const submit = () => {
    if (!message.trim()) return;

    socketRef.current.emit("private-msg", { to: friendId, message });

    const newMsg = { from: userId, to: friendId, message, time: Date.now() };
    setChat((prev) => [...prev, newMsg]);
    setMessage("");
  };

  const clearChat = () => {
    setChat([]); // effect khud localStorage update kar dega
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, width: 280 }}>
      <h2>I am {userId}</h2>
      <p>Chatting with: {friendId}</p>

      <input
        type="text"
        placeholder="enter msg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button onClick={submit}>Send</button>
      <button onClick={clearChat}>Clear</button>

      <ul>
        {chat.map((item, index) => (
          <li key={index}>
            <b>{item.from === userId ? "me" : item.from}:</b> {item.message}
            <small style={{ color: "gray", marginLeft: 6 }}>
              {new Date(item.time).toLocaleTimeString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatScreen;