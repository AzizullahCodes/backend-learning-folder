// Data store
import UserModal from "../../modals/user-modal/user-modal.js";
let fruits = ['apple', 'banana', 'grapes'];

// Controller 1
const greetUser = async (req, res) => {
    return res.status(200).send({
        message: 'node module is running'
    });
};

// Controller 2
const fruitApi = async (req, res) => {
    return res.status(200).send({
        status: true,
        message: 'fruit api created successfully',
        data: fruits
    });
};


//save and createUser controller
const createUser = async(req,res)=>{
    try{
const newUser = new UserModal(req.body)
const saveUser = await newUser.save()
if(saveUser){
    return res.status(200).send({
        status : true,
        message : 'user saved successfully'
    })
}
    }
    catch(error){
        console.log(`Error while saving user to mongoDB : ${error}`)
        return res.status(500).send({
            status : false,
            message : "internal server Error"
        })
    }
}

export { greetUser, fruitApi };