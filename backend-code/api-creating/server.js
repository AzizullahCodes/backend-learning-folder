//server.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
//create a server
const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(cors())

let users = []
//create first api
server.get('/myApi',(req,res)=>{
    return res.status(200).send({
        status : true,
        data : users
    })
})
//add user api
server.post('/myApi/addUser',(req,res)=>{
    const {user} = req.body
    if(user == '' || user == undefined){
        return res.status(400).send({
            status : 400,
            message : 'user name is required'
        })
    }
    let cloneExistingUsers = [...users]
    cloneExistingUsers.push(user)
    users = cloneExistingUsers

    return res.status(200).send({
        status : true,
        data : users
    })
})
//api for delete user
server.delete('/myApi/deleteUser/:key',(req,res)=>{
    const {key} = req.params
    const myKey = Number(key)
    // if(myKey == undefined || myKey == ''){
    //     return res.status(400).send({
    //         status:false,
    //         message : 'myKey(index) is required for deleting user'
    //     })
    // }
    let cloneExistingUsers = [...users]
    cloneExistingUsers.splice(myKey,1)
    users = cloneExistingUsers
    
    return res.status(200).send({
        status : true,
        message : 'user deleted successfully'
    })
})
//port 
const port = 5050;
server.listen(port,()=>{
    console.log('node js runing ',port)
})