//backend server file (express server)
import 'dotenv/config'
import express from 'express'
import next from 'next';
import userRotuer from './routes/user-routes/user-routes.js'
import handleConnectDB from './mongoDbConfiguration/db.js';

const dev = process.env.NODE_ENV != "production";

const nextApp = next({dev : dev})
const handle = nextApp.getRequestHandler()

  const port = 3000

  nextApp.prepare().then(async()=>{
    //first we connect mongo db here
    await handleConnectDB()

// create express server here 
const app = express();

//middleware
app.use(express.json())

//test api 
app.get('/api/test',(req,res)=>{
    res.send({
        status : true,
        message : 'test api called successfully'
    })
})

//import userRotues put here
app.use('/api/test',userRotuer)
//all another request handle next js server
app.use((req,res)=>{
    return handle(req,res)
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
  })