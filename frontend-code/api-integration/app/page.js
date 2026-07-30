'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [data,setData] = useState([])
  const [newUser,setNewUser] = useState('')
  const [isEdit,setIsEdit] = useState(false);
  const [requiredKey,setRequiredKey] = useState('')
  //fetchingAllUsers function
  const fetchingAllUsers = async()=>{
    const apiUrl = 'http://localhost:5050/myApi'
    try{
let res = await axios({
  url: apiUrl,
  method:'GET'
})
// console.log(res)
// console.log(res.status)
// console.log(res.data.data)
const {status,data} =res
if(status == 200){
  setData(data.data)
}
    }
    catch(error){
      console.log('Error while fetching all users from server')
    }
  }
//addUser function 
const addUser = async()=>{
  // console.log('workign') 
  const apiUrl = 'http://localhost:5050/myApi/addUser'
  try{
    let res = await axios({
      url:apiUrl,
      method : 'POST',
      data : {user : newUser}
    })
    console.log(res.status)
    const {status} = res
    if(status == 200){
      fetchingAllUsers();
      setNewUser('')
    }

  }
  catch(error){
    console.log('Error while add new user :',error)
  }
}
//delete user function 
const deleteUser = async(index)=>{
  // console.log('workign') 
  const apiUrl = `http://localhost:5050/myApi/deleteUser/${index}`
  try{
    let res = await axios({
      url:apiUrl,
      method:'DELETE'
    })
    console.log(res.status)
    const {status} = res
    if(status == 200){
      fetchingAllUsers();
    
    }

  }
  catch(error){
    console.log('Error while deleting user :',error)
  }
}
//editUser function 
const editUser = (index)=>{
  console.log(index)
  let requiredData = data[index]
  setNewUser(requiredData)
  setIsEdit(true)
  setRequiredKey(index)

}
//update user 
const updateUser = async()=>{
  const apiUrl = 'http://localhost:5050/myApi/updateUser'
  try{
    let res = await axios({
      url:apiUrl,
      method: 'PUT',
      data : {
        key : requiredKey,
        val : newUser
      }
      
    })
    const {status} = res
    if(status == 200){
      fetchingAllUsers();
      setIsEdit(false);
      setRequiredKey('')
      setNewUser('')
    }

  }
  catch(error){
    console.log('Error while updating user in server')
  }

}
//delete all users function 
const deleteAllUsers = async()=>{

  
  // console.log('workign') 
  const apiUrl = `http://localhost:5050/myApi/deleteAll`
  try{
    let res = await axios({
      url:apiUrl,
      method:'DELETE'
    })
    console.log(res.status)
    const {status} = res
    if(status == 200){
      fetchingAllUsers();
    
    }

  }
  catch(error){
    console.log('Error while  deleting all  user :',error)
  }
}
  //useEffect for calling function 
  useEffect(()=>{
    fetchingAllUsers()
  },[])
  // console.log('data...... ',data)
  return (
    <>
    <h1>API Integration</h1>
    <input
    type='text'
    placeholder='Enter user'
    onChange={(e)=>setNewUser(e.target.value)}
    value={newUser}
    />
    {
      isEdit ? <button onClick={updateUser}>update user</button>:<button onClick={addUser}>add user</button>
    }
    <button onClick={deleteAllUsers}>delete all</button>
    <div>
      <ul>
        {
          data?.map((item,index)=>{
            return(<li key={index}>{item}
            <button onClick={()=>deleteUser(index)}>delete user</button>
            <button onClick={()=>editUser(index)}>Edit user</button></li>)
          })
        }
      </ul>
    </div>
    </>
  )
}

export default Home