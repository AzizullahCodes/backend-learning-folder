// All user related controller functions are defined here...!

import mongoose from "mongoose";
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
        return res.status(200).send({
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

const deleteUser = async (req, res) => {
  const { uid } = req.params;
//   checking uid is valid 
  const checkUid = mongoose.isValidObjectId(uid)
  if(!checkUid){
    return res.status(400).send({
        status : false,
        message : 'uid is not valid'
    })
  }

  try {
    // const del = await UserModal.deleteOne({_id:uid})
    const del = await UserModal.findByIdAndDelete(uid);

    if (del) {
      return res.status(200).send({
        status: true,
        message: 'User deleted successfully'
      });
    } else {
      return res.status(404).send({
        status: false,
        message: 'User not found in MongoDB'
      });
    }
  } catch (error) {
    console.log(`Error while deleting user from MongoDB: ${error}`);
    return res.status(500).send({
      status: false,
      message: 'Error occurred while deleting user from MongoDB'
    });
  }
};
//api for update data in mongoDB 
const updateUser = async(req,res)=>{
    // const {uid,updateName} = req.body 
    const {updateName} = req.body;
    const {uid} = req.params;
    try{
   const updUser = await UserModal.findByIdAndUpdate(
    uid,
    {userName : updateName},
    {new : true}  //this is for update all data
   )
   if(updateUser){
    return res.status(200).send({
        status : true,
        message : 'user updated successfully',
        data : updUser
    })
   }
    }
    catch(error){
        console.l
        (`Error while updating user in mongoDB ${error}`);
        return res.status(500).send({
            status : false,
            message : 'Error while updating user in database'
        })
    }
}
export { greetUser, createUser,fetchUsers,deleteUser,updateUser};