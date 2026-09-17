// //user model sturucture we create schema here
// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({
//     email : {
//         type : String
//     },
//     password : {
//         type : String,
//         required : true
//     }
    
// },
// {
//          collection: "users", 
         
//         timestamps : true
//     }
// )
// const userModal = mongoose.model('users',userSchema);
// export default userModal 
// we create schema in user modal for database
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },

    password : {
        type : String,
        required : true
    }

}
,
{
   collection : "users",
    timestamps : true
})

const userModal = mongoose.model("users", userSchema)
export default userModal;