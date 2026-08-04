//all user-controllers are defined here 
const greetUser = (req,res)=>{
    return res.status(200).send({
        message : 'node modules in node js'
    })
}
export {greetUser}