import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
  import * as dns from "dns"; // For resolving hostnames...!
import connectDB from "./src/db/db.js";

import userRoutes from "./src/routes/user-routes/user-routes.js";

  dns.setDefaultResultOrder("ipv4first"); // For resolving hostnames to IPv4 addresses first...!
  dns.setServers(["1.1.1.1", "8.8.8.8"]); // For setting custom DNS servers...!

const port = 5050;

// const limit = rateLimit({
//     windowMs: 1000 * 60 * 15,
//     max: 10,
//     standardHeaders: true
// });
const limit = rateLimit({
   windowMs : 1000 * 60 * 15,
  max : 5,
  standardHeaders : true

})
const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());
server.use(compression());
server.use(limit);
server.use(userRoutes);

// limit for specidfic route
// server.use(limit, productRoutes)

server.listen(port, () => {
    console.log('Your Node JS server is running!');
    connectDB();
});