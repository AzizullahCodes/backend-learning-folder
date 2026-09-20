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
    },
    token : {
        type : String,
        default : ''
    },

    // NEW: OTP fields
    otp : {
        type : String,
        default : ''
    },
    otpExpires : {
        type : Date
    },
    otpAttempts : {
        type : Number,
        default : 0
    }
}
,
{
   collection : "users",
    timestamps : true
})

const userModal = mongoose.model("users", userSchema)
export default userModal;