//user model sturucture we create schema here
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email : {
        type : String
    },
    password : {
        type : String,
        required : true
    }
    
},
{
         collection: "users", 
         
        timestamps : true
    }
)
const userModal = mongoose.model('users',userSchema);
export default userModal 