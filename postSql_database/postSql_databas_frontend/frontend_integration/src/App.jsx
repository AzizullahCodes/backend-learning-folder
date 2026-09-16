import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [fetchUsers, setFetchUsers] = useState([])
  const [editId,setEditId] = useState(null)
  const isEdit = false
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
//delete Allusers handler  
const deleteAllUsersHandler = async()=>{
 let apiUrl = `http://localhost:5050/user/deleteAll`
 try{
  const res = await axios({
    url : apiUrl,
    method : 'DELETE',
  })
  if(res){
    alert('all users deleted successfully')
    window.location.reload()
  }

 }
 catch(error){
  console.log('error while deleting all users', error?.response?.data || error.message)
 }
}

//cance edit function 
const cancelEdit = async()=>{
  setEditId('');
  setUserName('');
  setEmail('');
  setAge('')
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
//update user funciton 
const editUser = async(item)=>{
  setEditId(item.id);
  setUserName(item.username);
  setEmail(item.email);
  setAge(item.age)
  
}

//update User funciton 
const updateUser = async()=>{
  if(!username || !email || !age){
    alert('fill all fields')
    return
  }
  else{
    let obj = {
      id : editId,
      username,
      email,
      age
    }
    
    try{
      let apiUrl = 'http://localhost:5050/user/update'
      const res = await axios({
        url : apiUrl,
        method : 'PUT',
        data : obj
      })
      if(res){
        alert('user updated successfully')
        setEditId('');
        setAge('');
        setUserName('')
        setEmail('')

        fetchAllRegisteredUsers()
      }

    }
    catch(error){
      console.log('error while updating user')
    }
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
        <span className="app-header__tag">Reg. No. {String(fetchUsers?.length + 1 || 1).padStart(3, '0')}</span>
        <h1 className="app-header__title">User Registry</h1>
        <p className="app-header__sub">Add, edit, and manage directory entries.</p>
      </header>

      <main className="app-main">
        <section className="entry-card">
          <span className="entry-card__tab">{editId ? 'Editing' : 'New entry'}</span>
          <h2 className="entry-card__title">{editId ? 'Edit entry' : 'Add a record'}</h2>

          <div className="field">
            <label className="field__label" htmlFor="field-name">Name</label>
            <input
              id="field-name"
              className="field__input"
              type="text"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="new-username"
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="field-email">Email</label>
            <input
              id="field-email"
              className="field__input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="field-age">Age</label>
            <input
              id="field-age"
              className="field__input"
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              autoComplete="new-age"
            />
          </div>

          <div className="entry-card__actions">
            {
              (editId) ? (
                <>
                  <button className="btn btn--primary" onClick={updateUser}>Update entry</button>
                  <button className="btn btn--ghost" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <button className="btn btn--primary" onClick={addUserHandler}>Add entry</button>
              )
            }
          </div>
        </section>

        <section className="directory">
          <div className="directory__head">
            <h2 className="directory__title">Directory</h2>
            <span className="directory__count">{fetchUsers?.length || 0} registered</span>
          </div>

          {fetchUsers?.length > 0 ? (
            <div className="directory__table" role="table">
              <div className="directory__row directory__row--head" role="row">
                <span role="columnheader">No.</span>
                <span role="columnheader">Name</span>
                <span role="columnheader">Email</span>
                <span role="columnheader">Age</span>
                <span role="columnheader" aria-label="Actions"></span>
              </div>

              {
                fetchUsers?.map((item, index) => {
                  return (
                    <div className="directory__row" role="row" key={item.id}>
                      <span className="directory__no" role="cell">{String(index + 1).padStart(2, '0')}</span>
                      <span className="directory__name" role="cell">{item.username}</span>
                      <span className="directory__email" role="cell">{item.email}</span>
                      <span className="directory__age" role="cell">{item.age}</span>
                      <span className="directory__actions" role="cell">
                        <button className="link-btn" onClick={() => editUser(item)}>Edit</button>
                        <button className="link-btn link-btn--danger" onClick={() => deleteUserHandler(item)}>Delete</button>
                      </span>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <p className="directory__empty">No entries yet — add the first one on the left.</p>
          )}

          {fetchUsers?.length > 0 && (
            <button className="btn btn--outline btn--full" onClick={deleteAllUsersHandler}>Clear directory</button>
          )}
        </section>
      </main>
    </div>
  )
}
export default App