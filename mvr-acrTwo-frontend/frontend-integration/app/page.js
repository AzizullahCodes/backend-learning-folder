'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Home = ()=>{
  const [data,setData] = useState([]);
  const [addUser,setAddUser] = useState('')
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('')

  //fetcUsers from mongo server function 
  const fetcUsers = async(req,res)=>{
  let dbUrl = 'http://localhost:5050/user/fetchUser'
    try{
      
      let getData = await axios({
        url : dbUrl,
        method : "GET"
      })
      // console.log(getData.data.data)
      getData && setData(getData?.data?.data)

    }
    catch(error){
      console.log('Error while fetching users from server')
    }
  }
  //add user function from client side to server side
  const addUserFun = async(req,res)=>{
    let apiUrl = 'http://localhost:5050/user/save';

    try{
      let res = await axios({
        url : apiUrl,
        method : 'POST',
        data : {
          userName,
          email,
          password,
          role
        }
      })
 const {status} = res;
 if(status == 200){
  console.log('user added successfully from frontend to server');
  setUserName('');
  setEmail('');
  setPassword('');
  setRole('')
 }

    }
    catch(error){
      console.log('Error while adding new user from frontend to server')
    }
  }
  //delete user function 
  const deleteUser = async(item)=>{
    console.log(item)
    const requiredId = item._id;
    console.log(requiredId);
        let apiUrl = `http://localhost:5050/user/deleteUser/:${requiredId}`;

    try{
     let del = await axios({
      url:apiUrl,
      method : 'DELETE'
     })
     if(del){
      return res.status(200).send({
        status : true,
        message : 'user deleted successfully'
        
      })
     }
    }
    catch(error){
      console.log('Error while deleting user from mongoDB')
    }
  }
  //useEffect for calling fetchUser funciton 
  useEffect(()=>{
    fetcUsers();
  },[])
  console.log('data......',data)
  return(
    <div>
      <h1>Api Integration</h1>
      <input 
      type="text"
      placeholder="Enter userName here"
      value={userName}
      onChange={(e)=>setUserName(e.target.value)}
      autoComplete="new-userName"
       /><br/>

        <input 
      type="email"
      placeholder="Enter email address here"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      autoComplete="new-email"
       /><br/>

        <input 
      type="password"
      placeholder="Enter password here"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      autoComplete="new-password"
       /><br/>

        <input 
      type="text"
      placeholder="Enter your role('student' or 'trainer') here"
      value={role}
      onChange={(e)=>setRole(e.target.value)}
      autoComplete="new-role"
       /><br/>

       <button onClick={addUserFun}>add user</button>
       {/* show all users that are fetched from mongodb */}
       <div>
        <ul style={{display: 'flex', gap: '14px',flexDirection : 'column'}}>
          {
            data?.map((item,index)=>{
              return(<li key={item._id} style={{display: 'flex', gap : '20px'}} >
                <span>{item.userName}</span>
               <span>{item.email}</span> 
               <span>{item.role}</span>
               <span>
                <button onClick={()=>deleteUser(item)}>delte user</button></span></li>)
            })
          }
        </ul>
       </div>
    </div>
  )
}
export default Home