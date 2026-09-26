// server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const port = process.env.PORT || 5051

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
const users = new Map();

io.on("connect", (socket) => {
  console.log("socket connected successfully....", socket.id);

  // registering user name from frontend comes
  socket.on("register", (uid) => {
    console.log(`user id....${uid}`);
    users.set(uid, socket.id);
    console.log("users array is...", users);
  });
  //reading data coming from frontend 
  socket.on('private_messages',({to,message})=>{
    console.log(`message is sent for....${to}`)
    console.log(`message is ....${message}`)
    let targetSocket = users.get(to)
    if(targetSocket){
        io.to(targetSocket).emit('read-messages',{
            message,
            from : socket.id
        })
    }
    else{
        console.log('user not found')
    }
  })

  // after disconnecting
  socket.on("disconnect", () => {
    for (const [uid, id] of users) {
      if (id === socket.id) {
        users.delete(uid); // disconnect hote hi address book se naam hata do
        console.log(`user disconnected: ${uid}`);
        break;
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log(`server is running at the port ${port}`);
});