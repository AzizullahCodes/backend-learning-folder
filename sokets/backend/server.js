import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from 'http';
import { Server } from "http";
import { Socket } from "socket.io";


const app = express();

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = new Server(httpServer,{
    cors : {
        origin : '*',
        method : ['GET','POST','PUT','DELETE']
    }
})


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//sockets functionality 
io.on("connect",(socket)=>{
    console.log('a user connected', socket.id)
})

app.get("/", (req, res) => {
  res.send('<h1>Hello world </h1>');
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));