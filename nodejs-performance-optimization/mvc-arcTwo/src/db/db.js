// DB Configuration...!

import mongoose from "mongoose";

let dbUrl = 'mongodb+srv://smitBatch-18:smitbatch18@backend-development.y6uu8ks.mongodb.net/?appName=backend-development'
const connectDB = async () => {
    try {
        const res = await mongoose.connect(
            dbUrl,
            { dbName: "users" }
        );
        res && console.log('Mongo DB connected successfully!');
    }

    catch (error) {
        console.log('Something went wrong while connecting DB:', error);
    };
};

export default connectDB;





// // mongoDB configuration file
// import mongoose from "mongoose";

// const connectedDB = async () => {
//     try {
//         let res = await mongoose.connect(
//             process.env.MONGO_URL,
//             { dbName: 'b_18' }
//         );
//         res && console.log('db connected successfully');
//     }
//     catch (error) {
//         console.log('error while connecting DB ', error);
//     }
// }

// export default connectedDB;