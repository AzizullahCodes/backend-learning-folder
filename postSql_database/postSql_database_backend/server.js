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