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

//     io.emit("msgFromFromBackend", 'i am from backend'); // sabko wapas bhejo
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//   });
// });
// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

// httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const PORT =  5050;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

io.on("connection", (socket) => {
  
  socket.on("msgFromFrontend", (data) => {
    console.log("message aaya:", data);

    io.emit("msgFromBackend", data); // sabko wapas bhejo
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));