// DB Configuration...!

import mongoose from "mongoose";

// let dbUrl = "mongodb+srv://AdminB18:Admin123@smit.qj6vxxm.mongodb.net/?appName=SMIT";
let dbUrl = 'mongodb+srv://azizullahcodes_db_user:rShLhYlLKgaAuDm@backend-practice.2hyvo6d.mongodb.net/?appName=backend-practice'
const connectDB = async () => {
    try {
        const res = await mongoose.connect(
            dbUrl,
            { dbName: "backend-learning-database" }
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