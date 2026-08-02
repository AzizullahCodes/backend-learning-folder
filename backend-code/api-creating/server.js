// //server.js
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors'
// //create a server
// const server = express();
// server.use(express.json());
// server.use(morgan('dev'));
// server.use(cors())

// let users = []
// //create first api
// server.get('/myApi',(req,res)=>{
//     return res.status(200).send({
//         status : true,
//         data : users
//     })
// })
// //add user api
// server.post('/myApi/addUser',(req,res)=>{
//     const {user} = req.body
//     if(user == '' || user == undefined){
//         return res.status(400).send({
//             status : 400,
//             message : 'user name is required'
//         })
//     }
//     let cloneExistingUsers = [...users]
//     cloneExistingUsers.push(user)
//     users = cloneExistingUsers

//     return res.status(200).send({
//         status : true,
//         data : users
//     })
// })
// //api for delete user
// server.delete('/myApi/deleteUser/:key',(req,res)=>{
//     const {key} = req.params
//     const myKey = Number(key)
//     let cloneExistingUsers = [...users]
//     cloneExistingUsers.splice(myKey,1)
//     users = cloneExistingUsers
    
//     return res.status(200).send({
//         status : true,
//         message : 'user deleted successfully'
//     })
// })
// //api for update user 
// server.put('/myApi/updateUser',(req,res)=>{
//     const {key} = req.body
//     const numericKey = Number(key)
//     const {val} = req.body 
//      let cloneExistingUsers = [...users]
//      cloneExistingUsers.splice(numericKey,1,val)
//      users = cloneExistingUsers 

//      return res.status(200).send({
//         status : true,
//         data : users,
//         message : 'user updated successfully'
//      })
    
// })
// //api for deleting all users....
// server.delete('/myApi/deleteAll',(req,res)=>{
//    users = []
//    return res.status(200).send({
//     status : true,
//     data : users,
//     message : 'all users deleted successfully'
//    })
// })
// //port 
// const port = 5050;
// server.listen(port,()=>{
//     console.log('node js runing ',port)
// })


//today task
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

//api for adding data from client side 
server.post('/myApi/addData',(req,res)=>{
    const {name,email,password} = req.body
    if(name == '' || email == '' || password == ''){
        return res.status(200).send({
            status : false,
            message : 'data is required from client side to creating an api in server side'
        })
    }
    let randomId = Math.floor(Math.random()*5)
    let obj = {
        id : randomId,
        name : name,
        email : email,
        password : password
    }
    users.push(obj)
    return res.status(200).send({
        status : true,
        message : 'data added successfully from client side',
        data : users
    })
})

//port 
const port = 5050;
server.listen(port,()=>{
    console.log('node js runing ',port)
})