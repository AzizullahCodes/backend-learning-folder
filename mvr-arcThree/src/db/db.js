// //db.js
// import mongoose from "mongoose";
// let dbUrl = 'mongodb+srv://smitBatch-18:smitbatch18@backend-development.y6uu8ks.mongodb.net/?appName=backend-development'
// const connectDB = async(req,res)=>{
// try{
//     let res = await mongoose.connect(
//         dbUrl,
//         {dbName : 'learning-db'}
//     )
//     res && console.log('mongoDB connected successfully')

// }
// catch(error){
//     console.log('Error while connecting mongoDB')
// }
// }
// export default connectDB


import mongoose from "mongoose";

let dbUrl = 'mongodb+srv://smitBatch-18:smitbatch18@backend-development.y6uu8ks.mongodb.net/?appName=backend-development';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, { dbName: 'learning-db' });
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log the actual error object to see why connection failed
    console.log('MongoDB connection error details:', error.message);
  }
};

export default connectDB;