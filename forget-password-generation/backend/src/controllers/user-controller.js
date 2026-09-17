
import userModal from "../modals/user-modal/user-modal.js";
import bcrypt from "bcryptjs";
import Randomstring from "randomstring";
import handleEmailVerification from "../configuration/nodemailConfiguration.js";

import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'

//signup api 
const signUp =  async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        let isUserExist = await userModal.findOne({email : req.body.email})
        if(isUserExist){
            return res.status(400).send({
                status : false,
                message : 'user with this email exist already use new email for sign up'
            })
        }
        
        //secure password with bcyptjs 
        const securePassword = await bcrypt.hash(req?.body?.password,10)
        //we create new user here
        const userData = {
            name,
            email,
            password : securePassword
        }

        const newUser = new userModal(userData)
        const saveUser = await newUser.save();
        if(saveUser){
            return res.status(200).send({
                status : true,
                message : 'new user sign up successfully'
            })
        }
        

    }
    catch(error){
        console.log('Error while sign up new user',error);
        return res.status(500).send({
            status : false,
            message : 'error while signup new user'
        })
    }
}
//login api 
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const isUserExist = await userModal.findOne({email : email})
        if(!isUserExist){
            return res.status(401).send({
                status : false,
                message : 'user with this email not existed'
            })
        }

        let checkPassword = await bcrypt.compare(password, isUserExist.password)
        if(!checkPassword){
            return res.status(404).send({
                status : false,
                message : 'Invalid password'
            })
        }
       //generate jwt token 
       const token = jwt.sign({
        email : isUserExist.email
       },
    process.env.Jwt_token,
    {
        expiresIn : '5h'
    }
)

        //200 
        return res.status(200).send({
            status : true,
            message :"you have logged in successfully",
            token : token
        })

    }
    catch(error){
        console.log('Error while logging user ', error);
        return res.status(500).send({
            status : true,
            message: 'Error while login user'
        })
    }
}

//forgot password api 
const forgotPassword = async(req,res)=>{
    try{
    //   return redirect('http://localhost:5173/forgotPassword')
    const {email} = req.body

    const isUserExist = await  userModal.findOne({email : email})
    if(isUserExist){
        const token = Randomstring.generate(7);
         isUserExist.token = token;
         await  isUserExist.save()
      

         await handleEmailVerification(isUserExist.email,token)
        return res.status(200).send({
            status : true,
            message : 'check email for reset password link.'
        })

    }
    else{
        return res.status(200).send({
            status : false,
            message : 'invalid email id.'
        })
    }
    }
    catch(error){
        console.log('Error while forgetting password checking', error)
    }
}


//reset password api 
const resetPassword = async(req,res)=>{
    try{
        const {password,token} = req.body;
        const hashPassword = await bcrypt.hash(req?.body?.password,10)

        const user = await userModal.findOne({token : token})
        if(user){
            const updateData = await userModal.findByIdAndUpdate({_id : user._id},{$set : {password : hashPassword, token : ''}},{new : true})
           return res.status(200).send({
            status : true,
            message : 'password resetted successfully'
           })
        }
        else{
            return res.status(200).send({
                status : false,
                message : 'token has expired'
            })
        }

    }
    catch(error){
        console.log('Error while reseting password ', error)
    }
}
export { signUp, login,forgotPassword,resetPassword}

