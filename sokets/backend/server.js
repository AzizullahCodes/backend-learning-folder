// Web Sockets
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const port = 5050;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"], // method -> methods
  },
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const users = {}; // { user_1: "socketId", user_2: "socketId" }

io.on("connect", (socket) => {
  console.log("A user connected:", socket.id);

  // 1) User apni ID register karta hai
  socket.on("register", (uid) => {
    users[uid] = socket.id;
    socket.data.uid = uid; // is socket ki ID yaad rakho
    console.log("Users:", users);
  });

  // 2) Private message
  socket.on("private-msg", ({ to, message }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("read-messages", {
        message,
        from: socket.data.uid, // sender ki asli ID
      });
    } else {
      // sender ko batao ke user online nahi hai
      socket.emit("user-offline", `${to} abhi online nahi hai`);
    }
  });

  // 3) Disconnect pe cleanup
  socket.on("disconnect", () => {
    const uid = socket.data.uid;
    if (uid && users[uid] === socket.id) delete users[uid];
    console.log("User disconnected:", socket.id, users);
  });
});

httpServer.listen(port, () => {
  console.log("Your Node JS server is running!");
});