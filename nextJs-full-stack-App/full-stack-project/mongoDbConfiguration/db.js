//db.js
import mongoose from "mongoose";

const handleConnectDB = async()=>{
    try{
   const isConnect = mongoose.connect(
    process.env.dbUrl ,
    {
        dbName : 'nextjs-full-stack'
    }
   )
      isConnect && console.log(`mongoDB conected successfully`)

//    isConnect && console.log(`mongoDB conected successfully -${isConnect.connect.host}`)
    }
    catch(error){
        console.log('Error while connectiong Db ',error)
    }
}

export default handleConnectDB