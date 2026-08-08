// All user related controller functions are defined here...!

import UserModal from "../../modals/user-modal/user-modal.js";

const greetUser = (req, res) => {
    return res.status(200).send({
        message: "User module in Node JS"
    });
};


const createUser = async(req,res)=>{
    const {userName,email,password,role} = req.body

    try{
     if(!email || !password || !role){
        return res.status(400).send({
            status : false,
            message: "email,password and role are required.........!"
        })
     }
     let isUserExist = await UserModal.findOne({email})
     if(isUserExist){
        return res.status(400).send({
            status : false,
            message : 'This email already existed, use new email'
        })
     }
     const newUser = await new UserModal({userName,email,password,role})
     const saveUser = await newUser.save()
     if(saveUser){
        return res.status(200).send({
            status : true,
            message : 'new user saved successfully'
        })
     }
    }
    catch(error){
        console.log(`Error while storing data to mongoDB, ${error}`)
        return res.status(500).send({
            status : false,
            message : 'Internal server error!'
        })
    }
}
//fetchAllUserFrom mogo db 
const fetchUsers = async(req,res)=>{
try{
    const {role} = req.query
    // console.log(role) 
    const counts = await UserModal.countDocuments();
    console.log('counts ',counts)
    if(counts == 0){
        return res.status(400).send({
            status : false,
            message : 'No user found in mongoDB',
            data : []
        })
    }
    const query = (role) ?({role}) : ({})
// let fetchData = await UserModal.find(); 
// let fetchData  = await UserModal.find(query)
let fetchData  = await UserModal.find(query).select('-password')

if(fetchData){
    return res.status(200).send({
        status : true,
        message : 'all users fetched from mongoDB successfully',
        data : fetchData
    })
        
    
}
}
catch(error){
    console.log(`Error while fetching all users from mongoDB ${error}`);
    return res.status(500).send({
        status : false,
        message : "an error occured while fetching users from mongoDB"
    })
}
}
//delete user controller/api 
const deleteUser = async(req,res)=>{
    const {uid} = req.params();
    
    try{
        let del = await UserModal.findByIdAndDelete(uid)
        if(del){
            return res.status(200).send({
                status : true,
                message : 'user deleted successfully'
            })
        }
        }
    catch(error){
        console.log(`Error while deleting user from monoDB ${error}`);
        return res.status(500).send({
            status : false,
            message : 'Error occured while deleting user from mongoDB'
        })
    }
}
export { greetUser, createUser,fetchUsers,deleteUser};