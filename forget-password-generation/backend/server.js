//server.js
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import * as dns from 'dns'
import router from './src/routes/user-routes/user-routes.js';
import connectDB from './src/db/db.js';
 dns.setDefaultResultOrder("ipv4first"); 
config({path: "./.env"})
const port = process.env.PORT

const server = express();
server.use(express.json())
server.use(morgan('dev'))
server.use(cors())
server.use(router)

// server.get('/testing',(req,res)=>{
//     return res.status(200).send({
//         status : true,
//         message :'api is runnig'
//     })
//     console.log('server is running')
// })

server.listen(port,()=>{
    console.log('server is running on port ',port)
    connectDB()
})