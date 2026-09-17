//all apis we make here 

import userModal from "../modals/user-modal/user-modal.js";
import bcrypt from "bcryptjs";

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
        //  const securePass = await bcrypt.hash(req?.body?.password,10);
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


export  {signUp}