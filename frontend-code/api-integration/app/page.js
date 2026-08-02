// 'use client'
// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import styles from './Home.module.css'

// const Home = () => {
//   const [data, setData] = useState([])
//   const [newUser, setNewUser] = useState('')
//   const [isEdit, setIsEdit] = useState(false);
//   const [requiredKey, setRequiredKey] = useState('')

//   //fetchingAllUsers function
//   const fetchingAllUsers = async () => {
//     const apiUrl = 'http://localhost:5050/myApi'
//     try {
//       let res = await axios({
//         url: apiUrl,
//         method: 'GET'
//       })
//       const { status, data } = res
//       let requiredData = data.data
//       if (status == 200) {
//         setData(requiredData)
//       }
//     }
//     catch (error) {
//       console.log('Error while fetching all users from server')
//     }
//   }

//   //addUser function 
//   const addUser = async () => {
//     const apiUrl = 'http://localhost:5050/myApi/addUser'
//     try {
//       let res = await axios({
//         url: apiUrl,
//         method: 'POST',
//         data: { user: newUser }
//       })
//       const { status } = res
//       if (status == 200) {
//         fetchingAllUsers();
//         setNewUser('')
//       }
//     }
//     catch (error) {
//       console.log('Error while add new user :', error)
//     }
//   }

//   //delete user function 
//   const deleteUser = async (index) => {
//     const apiUrl = `http://localhost:5050/myApi/deleteUser/${index}`
//     try {
//       let res = await axios({
//         url: apiUrl,
//         method: 'DELETE'
//       })
//       const { status } = res
//       if (status == 200) {
//         fetchingAllUsers();
//       }
//     }
//     catch (error) {
//       console.log('Error while deleting user :', error)
//     }
//   }

//   //editUser function 
//   const editUser = (index) => {
//     let requiredData = data[index]
//     setNewUser(requiredData)
//     setIsEdit(true)
//     setRequiredKey(index)
//   }

//   //update user 
//   const updateUser = async () => {
//     const apiUrl = 'http://localhost:5050/myApi/updateUser'
//     try {
//       let res = await axios({
//         url: apiUrl,
//         method: 'PUT',
//         data: {
//           key: requiredKey,
//           val: newUser
//         }
//       })
//       const { status } = res
//       if (status == 200) {
//         fetchingAllUsers();
//         setIsEdit(false);
//         setRequiredKey('')
//         setNewUser('')
//       }
//     }
//     catch (error) {
//       console.log('Error while updating user in server')
//     }
//   }

//   //delete all users function 
//   const deleteAllUsers = async () => {
//     const apiUrl = `http://localhost:5050/myApi/deleteAll`
//     try {
//       let res = await axios({
//         url: apiUrl,
//         method: 'DELETE'
//       })
//       const { status } = res
//       if (status == 200) {
//         fetchingAllUsers();
//       }
//     }
//     catch (error) {
//       console.log('Error while  deleting all  user :', error)
//     }
//   }

//   //useEffect for calling function 
//   useEffect(() => {
//     fetchingAllUsers()
//   }, [])

//   return (
//     <div className={styles.page}>
//       <div className={styles.card}>
//         <div className={styles.header}>
//           <span className={styles.eyebrow}>User Directory</span>
//           <h1 className={styles.title}>API Integration</h1>
//         </div>

//         <div className={styles.inputRow}>
//           <input
//             type='text'
//             placeholder='Enter user'
//             onChange={(e) => setNewUser(e.target.value)}
//             value={newUser}
//             className={styles.input}
//           />
//           {
//             isEdit
//               ? <button onClick={updateUser} className={styles.primaryBtn}>Update user</button>
//               : <button onClick={addUser} className={styles.primaryBtn}>Add user</button>
//           }
//         </div>

//         {
//           data?.length > 0 &&
//           <div className={styles.toolbar}>
//             <span className={styles.count}>{data.length} user{data.length > 1 ? 's' : ''}</span>
//             <button onClick={deleteAllUsers} className={styles.dangerBtn}>Delete all</button>
//           </div>
//         }

//         <ul className={styles.list}>
//           {
//             data?.map((item, index) => {
//               return (
//                 <li key={index} className={styles.listItem}>
//                   <span className={styles.itemText}>{item}</span>
//                   <div className={styles.itemActions}>
//                     <button onClick={() => editUser(index)} className={styles.editBtn}>Edit</button>
//                     <button onClick={() => deleteUser(index)} className={styles.deleteBtn}>Delete</button>
//                   </div>
//                 </li>
//               )
//             })
//           }
//         </ul>

//         {
//           data?.length === 0 &&
//           <p className={styles.empty}>No users yet — add one above to get started.</p>
//         }
//       </div>
//     </div>
//   )
// }

// export default Home 




'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = ()=>{
  const [data,setData] = useState([])
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')

  const fetchAllData = async()=>{
    const apiUrl = 'http://localhost:5050/myApi'
    try{
      let res = await axios({
        url:apiUrl,
        method: 'GET'
      })
      console.log(res)
      const {status, data} = res 
      if(status == 200){
        setData(data.data)
      }

    }
    catch(error){
      console.log('Error while fetching all data from server')
    }
  }
  //function for adding data to api
  const addData = async()=>{
    const apiUrl = 'http://localhost:5050/myApi/addData'
    try{
      let res = await axios({
        url : apiUrl,
        method: 'POST',
        data : {
          name,
          email,
          password
        }
      })
      if(res.status == 200){
        console.log('data added successfully from client side to server')
        fetchAllData()
        setName('')
        setEmail('')
        setPassword('')
      }

    }
    catch(error){
      console.log('Error while adding data from frontend to backend ',error )
    }
  }
//useEffect for calling funciton 
useEffect(()=>{
  fetchAllData()
},[])
  return(
    <>
    <h1>api integration </h1>
    <div>
      <input type='text' placeholder='Enter your name'
      value={name} autoComplete='new-name'
      onChange={(e)=>setName(e.target.value)} /><br/>

      <input type='email' placeholder='Enter your email'
      value={email} autoComplete='new-email'
      onChange={(e)=>setEmail(e.target.value)} /><br/>

      <input type='password' placeholder='Enter your password'
      value={password} autoComplete='new-password'
      onChange={(e)=>setPassword(e.target.value)} /><br/>

      <button onClick={addData}>add data</button>
    </div>
    <div>
      <ul>
        {
          data?.map((item,index)=>{
            return(<li key={index}>{item.name} {item.email} {item.password}</li>)
          })
        }
      </ul>
    </div>

    </>
  )
}
export default Home;