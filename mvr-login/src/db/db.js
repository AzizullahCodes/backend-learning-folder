// DB Configuration...!

import mongoose from "mongoose";

let dbUrl = 'mongodb+srv://smitBatch-18:smitbatch18@backend-development.y6uu8ks.mongodb.net/?appName=backend-development'
const connectDB = async () => {
    try {
        const res = await mongoose.connect(
            dbUrl,
            { dbName: "mvrLoginDB" }
        );
        res && console.log('Mongo DB connected successfully!');
    }

    catch (error) {
        console.log('Something went wrong while connecting DB:', error);
    };
};

export default connectDB;

