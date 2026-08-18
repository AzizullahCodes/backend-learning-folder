//user-controller.js
import userModal from "../../modals/user-modal/user-modal.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

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
export {signUp ,handleLogIn}