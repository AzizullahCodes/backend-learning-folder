//server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const port = 5052;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETER"],
  },
});
const users = new Map();

io.on("connect", (socket) => {
  console.log("socket connected successfully....", socket.id);
//registering user name from frontend comes 
socket.on('register',(uid)=>{
    console.log(`user id....${uid}`)
    users.set(uid,socket.id.)
   console.log('users array is...',users)

})

});

httpServer.listen(port, () => {
  console.log(`server is running at the port ${port}`);
});
