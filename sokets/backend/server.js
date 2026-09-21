

// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import http from "http";
// import { Server } from "socket.io";

// const app = express();
// const httpServer = http.createServer(app);
// const PORT =  5050;

// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());

// io.on("connection", (socket) => {
  
//   socket.on("msgFromFrontend", (data) => {
//     console.log("message aaya:", data);

//     io.emit("msgFromBackend", data); // sabko wapas bhejo
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//   });
// });
// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

// httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import http from "http";
// import { Server } from "socket.io";

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "http://localhost:5174" },
// });

// io.on("connection", (socket) => {
//   socket.on("join", (username) => {
//     socket.data.username = username;
//     socket.broadcast.emit("system", `${username} joined the chat`);
//   });

//   socket.on("chat:message", (text) => {
//     if (!text || !text.trim()) return;
//     io.emit("chat:message", {
//       id: socket.id,
//       user: socket.data.username || "Anonymous",
//       text: text.trim(),
//     });
//   });

//   socket.on("disconnect", () => {
//     if (socket.data.username) {
//       io.emit("system", `${socket.data.username} left the chat`);
//     }
//   });
// });

// server.listen(4000, () => console.log("Server on http://localhost:4000"));

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';


const port = 5050
 const app = express();

 const httpServer = http.createServer(app)

 const io = new Server(httpServer,{
  cors : {
    origin : '*',
    methods : ['GET','POST','DELETE','PUT']
  }
 })

 app.use(cors())
 app.use(morgan('dev'))
 app.use(express.json())

 //socket functionality 
 io.on('connect', (socket)=>{
  console.log('a user connected...', socket.id)

  //1 
 socket.on('read-message',(msg)=>{
  console.log('msg received from frontend...',msg)

  socket.emit('testing',`${msg}`)
 })

 })

 

 httpServer.listen(port,()=>{
  console.log('node js server is runing with soket functionaliy')
 })