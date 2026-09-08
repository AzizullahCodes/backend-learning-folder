import "dotenv/config"; // YE SABSE PEHLI LINE HONI CHAHIYE

import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dns from "dns";
import router from "./src/routes/user-routes/user-routes.js";
import connectDB from "./src/db/db.js";

dns.setDefaultResultOrder("ipv4first");

const port = 5050;
const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(router);

server.listen(port, () => {
    console.log('Your Node JS server is running!');
    connectDB();
});