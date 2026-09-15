// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// const App = ()=>{
//   const [username,setUserName] = useState('');
//   const [email,setEmail] = useState('');
//   const [age,setAge] = useState('');
//   const [fetchUsers,setFetchUsers] = useState([])
// //addUserHandler function 
// const addUserHandler = async ()=>{
//   if(!username || !email || !age){
//     return alert('plz fill all fields')
//   }
//   else{
//     let obj = {
//       username,
//       email,
//       age
//     }

//     console.log('created object is....', obj)

//     try{
//        let apiUrl = 'http://localhost:5050/user/add'
//        const res = await axios({
//         url : apiUrl,
//         method : 'POST',
//         data : obj

//        })
//        console.log(res)
//        if(res){
//         console.log('user added successfully from frontend to db')
//         setUserName('')
//         setAge('')
//         setEmail('')
//        }
//     }
//     catch(error){
//       console.log('Error while adding user from frontend to backend')
//     }
//   }
// }


// //fetchAllRegisteredUsers function
// const fetchAllRegisteredUsers = async()=>{
//   let apiUrl = 'http://localhost:5050/user/fetchAll'
//   try{
//     const res = await axios({
//       url : apiUrl,
//       method : 'GET',

//     })
//     res && setFetchUsers(res?.data?.data)

//   }
//   catch(error){
//     console.log('error while fetch all users from db')
//   }
// }
// //useEffect for fetchAllRegisteredUsers function executing 
// useEffect(()=>{
//   fetchAllRegisteredUsers()
// },[])
// console.log(fetchUsers)
//   return(
//     <div>
//       <h1>Frontend Integration</h1>
//       <div>
//         <h2>user information</h2>

//         <input type="text"
//         placeholder="Enter name"
//         value={username}
//         onChange={(e)=>setUserName(e.target.value)}
//         autoComplete="new-username" /><br/>

//         <input type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e)=>setEmail(e.target.value)}
//         autoComplete="new-email" /><br/>

//         <input type="number"
//         placeholder="Enter age"
//         value={age}
//         onChange={(e)=>setAge(e.target.value)}
//         autoComplete="new-age" /><br/>
//       </div>
//       <button onClick={addUserHandler}>add user</button>

//       <div>
//         {
//           fetchUsers?.map((item,index)=>{
//             return <li key={item.id}>
//               <h2>{item.username}</h2>
//               <p>{item.email}</p>
//               <p>{item.age}</p>
//             </li>
//           })
//         }
//       </div>
//     </div>
//   )
// }
// export default App

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [fetchUsers, setFetchUsers] = useState([])
  //addUserHandler function 
  const addUserHandler = async () => {
    if (!username || !email || !age) {
      return alert('plz fill all fields')
    }
    else {
      let obj = {
        username,
        email,
        age
      }

      console.log('created object is....', obj)

      try {
        let apiUrl = 'http://localhost:5050/user/add'
        const res = await axios({
          url: apiUrl,
          method: 'POST',
          data: obj

        })
        console.log(res)
        if (res) {
          console.log('user added successfully from frontend to db')
          alert('new user added successfully')
          setUserName('')
          setAge('')
          setEmail('')
          fetchAllRegisteredUsers()
        }
      }
      catch (error) {
        console.log('Error while adding user from frontend to backend')
      }
    }
  }
//delete user handler 
const deleteUserHandler = async(item)=>{
 let apiUrl = `http://localhost:5050/user/delete/${item.id}`
 try{
  const res = await axios({
    url : apiUrl,
    method : 'DELETE',
  })
  if(res){
    alert('user deleted successfully')
    window.location.reload()
  }

 }
 catch(error){
  console.log('error while deleting user')
 }
}

  //fetchAllRegisteredUsers function
  const fetchAllRegisteredUsers = async () => {
    let apiUrl = 'http://localhost:5050/user/fetchAll'
    try {
      const res = await axios({
        url: apiUrl,
        method: 'GET',

      })
      res && setFetchUsers(res?.data?.data)

    }
    catch (error) {
      console.log('error while fetch all users from db')
    }
  }
  //useEffect for fetchAllRegisteredUsers function executing 
  useEffect(() => {
    fetchAllRegisteredUsers()
  }, [])
  console.log(fetchUsers)
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-header__index">Registry</span>
        <h1 className="app-header__title">Frontend Integration</h1>
      </header>

      <main className="app-main">
        <section className="entry-card">
          <h2 className="entry-card__title">New entry</h2>

          <div className="field">
            <label className="field__label">Name</label>
            <input
              className="field__input"
              type="text"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="new-username"
            />
          </div>

          <div className="field">
            <label className="field__label">Email</label>
            <input
              className="field__input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
            />
          </div>

          <div className="field">
            <label className="field__label">Age</label>
            <input
              className="field__input"
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              autoComplete="new-age"
            />
          </div>

          <button className="entry-card__submit" onClick={addUserHandler}>
            Add user
          </button>
        </section>

        <section className="directory">
          <div className="directory__head">
            <h2 className="directory__title">Directory</h2>
            <span className="directory__count">{fetchUsers?.length || 0} registered</span>
          </div>

          <ul className="directory__list">
            {
              fetchUsers?.map((item, index) => {
                return (
                  <li className="directory__row" key={item.id}>
                    <span className="directory__no">{String(index + 1).padStart(2, '0')}</span>
                    <span className="directory__name">{item.username}</span>
                    <span className="directory__email">{item.email}</span>
                    <span className="directory__age">{item.age}</span>
                    <span onClick={()=>deleteUserHandler(item)}>delete</span>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </main>
    </div>
  )
}
export default App