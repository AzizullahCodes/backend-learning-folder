// DB Configuration...!

import mongoose from "mongoose";

// import mongoose from "mongoose";

// let dbUrl = 'mongodb+srv://smitBatch-18:smitbatch18@backend-development.y6uu8ks.mongodb.net/?appName=backend-development'
// const connectDB = async () => {
//     try {
//         const res = await mongoose.connect(
//             dbUrl,
//             { dbName: "users" }
//         );
//         res && console.log('Mongo DB connected successfully!');
//     }

//     catch (error) {
//         console.log('Something went wrong while connecting DB:', error);
//     };
// };

// export default connectDB;






const connectDB = async()=>{
    try{
    const res = await mongoose.connect(
        process.env.MONGO_URL, //this is name of cluster we are importing from .env file 
        {
            dbName : 'productsDB' //this is our database name
        }
    )

    res && console.log('mongoDB connected successfully')
    }
    catch(error){
        console.log(`Error while connect mongoDB ${error}`)
    }
}

export default connectDB;