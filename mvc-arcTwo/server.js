import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routes/user-routes/user-routes.js';
 import connectedDB from './src/db/db.js';

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(router);
connectedDB()
const port = 5050;

server.listen(port, () => {
    console.log('Node.js server is running on port', port);
});