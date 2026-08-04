// DB Configuration...!

// import mongoose from "mongoose";

// let dbUrl = "mongodb+srv://AdminB18:Admin123@smit.qj6vxxm.mongodb.net/?appName=SMIT";

// const connectDB = async () => {
//     try {
//         const res = await mongoose.connect(
//             dbUrl,
//             { dbName: "B18_DB" }
//         );
//         res && console.log('Mongo DB connected successfully!');
//     }

//     catch (error) {
//         console.log('Something went wrong while connecting DB:', error);
//     };
// };

// export default connectDB;

//db configuration 
import mongoose from "mongoose";

let dbUrl = 'avxd';
const connectDB = async()=>{
    try{
        let res = await mongoose.connect(
            dbUrl,
            {dbName : "db_18"}
        )
        res && console.log('mongoDB connected successfully')

    }
   
    catch(error){
        console.log('something went wrong while connected db : ', error)
    }
}