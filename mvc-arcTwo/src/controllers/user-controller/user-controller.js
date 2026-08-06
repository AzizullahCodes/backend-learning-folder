// All user related controller functions are defined here...!

import UserModal from "../../modals/user-modal/user-modal.js";

const greetUser = (req, res) => {
    return res.status(200).send({
        message: "User module in Node JS"
    });
};

// Save / create ysaer controller...!
// const createUser = async (req, res) => {
    
//     try {

//         const isUserExist = await UserModal.findOne({ email: req.body.email });
//         if (isUserExist) {
//             return res.status(400).send({
//                 status: false,
//                 message: "Email already exist!"
//             });
//         }

//         const newUser = new UserModal(req.body);
//         const saveUser = await newUser.save();

//         if (saveUser) {
//             return res.status(200).send({
//                 status: true,
//                 message: "User saved successfully"
//             });
//         }
//     }

//     catch (error) {
//         console.log(`Err while saving user: ${error}`);
//         return res.status(500).send({
//             status: false,
//             message: "Internal server error!"
//         });
//     };
// }

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
export { greetUser, createUser };