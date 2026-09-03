//user-controller.js
import userModal from "../../modals/user-modal/user-modal.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import credentials from "../../credentials/credentials.js";


//nodemailer variable 
const nodemailer = nodemailer();
// signUp controller/api
const signUp = async(req,res)=>{
    try{
    const isUserExist = await userModal.findOne({email : req.body.email})
    if(isUserExist){
        return res.status(400).send({
            status : false,
            message : 'user with this email exist already'
        })
    }
    // hasing password 
    const securePass = await bcrypt.hash(req?.body?.password,10);
    const userData = {...req?.body, password : securePass};
    console.log('users' , userData);

    const newUser = new userModal(userData);
    const saveUser = await newUser.save();
    if(saveUser){
        return res.status(200).send({
            status : true,
            message : 'new user saved successfully'
        })
    }
    }
    catch(error){
        console.log('Error while creating user',error);
        res.status(500).send({
            status: false,
            message : 'Error while creating new user in server'
        })
    }
}
//handleLogIn api 
const handleLogIn = async(req,res)=>{
    try{


const {email,password} = req?.body
if(!email && !password){
    return res.status(500).send({
        status : false,
        message : 'validation error'
    })
}

const isUserExist = await userModal.findOne({email : email})
if(!isUserExist){
    return res.status(401).send({
        status : false,
        message : 'user does not exist with this email'
    })
}

const checkPassword = await bcrypt.compare(password,isUserExist.password)
if(!checkPassword){
    return res.status(404).send({
        status : false,
        message : 'Invalid password'
    })
}


//Generating token: 
const token = jwt.sign({
    email : isUserExist.email
},
process.env.Jwt_token,
{
    expiresIn : '5h'

})
//200 
return res.status(200).send({
    status : true,
    message : 'you have logged In successfully',
    token : token
})

    }
    catch(error){
        console.log(`Error while logging In  ${error}`);
        return res.status(500).send({
            status : false,
            message : 'Error while Login'
        })
    }
}

//user verifying api we create here 
const userVerification = async (req,res)=>{
    const {email} = req.body;
    try{
        if(!email){
            return res.status(400).send({
        status : false,
        message : 'Email is required'
     })
        }
      //400
      const isUserExist = await userModal.findOne({email})
      if(!isUserExist){
        return res.status(401).send({
            status : false,
            message :'Account does not exist'
        })


       

    }
 //200
        const url = 'https://www.google.com.pk';
        const uid = isUserExist._id;
        // const newUrl = `${url}/${uid}`
        const isEmailSent = sendEmailToUser(email)
        return res.status(200).send({
            status : true,
            message : 'Email verified successfully kindly check your email and update yor password',
            // data : newUrl
        })
    }
    catch(error){
     console.log('something went wrong while verifying user....',error);
     return res.status(500).send({
        status : false,
        message : 'something went wrong while verifying user'
     })
    }
}

//funciton for sending email to user 
const sendEmailToUser = (email)=>{
   console.log(`user email is ${email}`)

   // Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service :"gmail" ,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
}
export {signUp ,handleLogIn,userVerification}