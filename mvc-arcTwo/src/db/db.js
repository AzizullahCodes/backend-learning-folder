// //mongoDB configuration file 
// import mongoose from "mongoose";
// const connectedDB = async()=>{
//     // let dbUrl = "mongodb+srv://AdminB18:Admin123@smit.qj6vxxm.mongodb.net/?appName=SMIT";
//    let dbUrl = 'mongodb+srv://azizullahcodes_db_user:e551XUL8vUDTlPe6@cluster0.sqtchog.mongodb.net/?appName=Cluster0'
//     try{
//         let res = await mongoose.connect(
//             dbUrl,
//             {dbName : 'b_18'}
//         )
//         res && console.log('db connected successfully')

//     }
//     catch(error){
//         console.log('error while connecting DB ',error)
//     }
// }
// export default connectedDB

// mongoDB configuration file
import mongoose from "mongoose";

const connectedDB = async () => {
    try {
        let res = await mongoose.connect(
            process.env.MONGO_URL,
            { dbName: 'b_18' }
        );
        res && console.log('db connected successfully');
    }
    catch (error) {
        console.log('error while connecting DB ', error);
    }
}

export default connectedDB;