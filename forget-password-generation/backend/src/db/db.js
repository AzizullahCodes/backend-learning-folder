//db.js 
import mongoose from "mongoose";
let dbUrl = 'mongodb+srv://smitBatch-18:smitbatch18@backend-development.y6uu8ks.mongodb.net/?appName=backend-development'
let ur = 'mongodb+srv://smitBatch-18:<db_password>@backend-development.y6uu8ks.mongodb.net/?appName=backend-development'

const connectDB = async ()=>{

    try{
        const res = await mongoose.connect(
            dbUrl,
            {dbName : "mvrLoginDB"}
        )
        res && console.log('mongo db connected successfully')

    }
    catch(error){
        console.log('Error while connecting mongon db',error)
    }}

    export default connectDB;