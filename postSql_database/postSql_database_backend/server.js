import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pool from './src/db/db.js';

const port = 5050;
const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

//api for add user 
server.post('/user/add', async(req,res)=>{
    const {username,email,age} = req.body

    try{
        let addQuery = "INSERT INTO users(username,email,age) VALUES($1,$2,$3) RETURNING *"
        const apiRes = await pool.query(
            addQuery,
            [username,email,age]
        )
        if(apiRes?.rows){
            return res.status(200).send({
                status : true,
                message : 'user added successfully',
                data : apiRes?.rows[0]
            })
        }
        console.log(apiRes?.rows)

    }
    catch(error){
        console.log('Error while adding user',error);
        return res.status(500).send({
            sttatus : false,
            message : 'Internal server error'
        })
    }
})
//api for update user
server.put('/user/update',async(req,res)=>{
    const {id,username,email,age} = req.body
    
try{
const apiRes = await pool.query(
    `UPDATE users SET
    username = $1,
    email = $2,
    age = $3
   WHERE id = $4
   RETURNING *`,
   [username,email,age,id]
)
console.log(`apiRes is ${apiRes}`)

if(apiRes.rows.length == 0){
    return res.status(404).send({
        status : false,
        message : 'user not found'
    })
}

if(apiRes){
    return res.status(200).send({
        status : true,
        message :'user updated successfully'
        
    })
}
}
catch(error){
    console.log(`Error while updating user ${error}`);
    return res.status(500).send({
        status : false,
        message :'internal server error'
    })
}
})


//api for user find by id 
server.get('/user/fetch/:uid',async(req,res)=>{
    const {uid} = req.params
    console.log(`uid is ${uid}`)
try{
const apiRes = await pool.query(
    "SELECT * FROM users WHERE Id = $1",
    [uid]
)
console.log(`apiRes is ${apiRes}`)

if(apiRes.rows.length == 0){
    return res.status(404).send({
        status : false,
        message : 'user not found'
    })
}

if(apiRes){
    return res.status(200).send({
        status : true,
        message :'user fetched by id successfully',
        data : apiRes.rows[0]
    })
}
}
catch(error){
    console.log(`Error while fetching user by id ${error}`);
    return res.status(500).send({
        status : false,
        message :'internal server error'
    })
}
})


//api for delete one user by id 
server.delete('/user/delete/:uid',async(req,res)=>{
    const {uid} = req.params
    console.log(`uid is ${uid}`)
try{
const apiRes = await pool.query(
    "DELETE  FROM users WHERE Id = $1 RETURNING *",
    [uid]
)
console.log(`apiRes is ${apiRes}`)

if(apiRes.rows.length == 0){
    return res.status(404).send({
        status : false,
        message : 'user not found'
    })
}

if(apiRes){
    return res.status(200).send({
        status : true,
        message :'user deleted by id successfully',
        data : apiRes.rows[0]
    })
}
}
catch(error){
    console.log(`Error while deleting user by id ${error}`);
    return res.status(500).send({
        status : false,
        message :'internal server error'
    })
}
})


//api for deleteAll users  
server.delete('/user/deleteAll', async (req, res) => {
    try {
        const apiRes = await pool.query("DELETE FROM users");

        return res.status(200).send({
            status: true,
            message: `${apiRes.rowCount} users deleted successfully`
        });
    }
    catch (error) {
        console.log('Error while deleting all users', error);
        return res.status(500).send({
            status: false,
            message: 'internal server error'
        });
    }
});
//api for fetch all registered users 
server.get('/user/fetchAll', async(req,res)=>{

    try{
        let addQuery = "SELECT * FROM users"
        const apiRes = await pool.query(
            addQuery
           
        )
        if(apiRes?.rows){
            return res.status(200).send({
                status : true,
                message : 'user fetched successfully from postsql db by node js',
                data : apiRes?.rows
            })
        }
        console.log(apiRes?.rows)

    }
    catch(error){
        console.log('Error while fetching all users form db using nodejs',error);
        return res.status(500).send({
            sttatus : false,
            message : 'Internal server error'
        })
    }
})


server.listen(port,()=>{
    console.log('node js server is running ',port)
})