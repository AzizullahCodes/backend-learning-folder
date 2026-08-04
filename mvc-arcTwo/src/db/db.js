//mongoDB configuration file 
import mongoose from "mongoose";
const connectedDB = async()=>{
   let dbUrl = 'daasfsf'
    try{
        let res = await mongoose.connect(
            dbUrl,
            {dbName : 'b_18'}
        )
        res && console.log('db connected successfully')

    }
    catch(error){
        console.log('error while connecting DB ',error)
    }
}
export default connectedDB