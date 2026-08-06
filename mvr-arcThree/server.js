//server.js
import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import myRoutes from './src/routes/user-routes/user-routes.js';
import connectDB from './src/db/db.js';

const server = express();
server.use(express.json());
server.use(morgan('dev'))
server.use(cors())
server.use(myRoutes)

const port = 5050;

server.listen(port,()=>{
    console.log('node js server is runing', port)
    connectDB()
})