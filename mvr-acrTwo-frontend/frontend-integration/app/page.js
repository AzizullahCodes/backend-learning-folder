'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Fetch users from MongoDB server
  const fetcUsers = async () => {
    let dbUrl = 'http://localhost:5050/user/fetchUser';
    try {
      let getData = await axios.get(dbUrl);
      if (getData?.data?.data) {
        setData(getData.data.data);
      }
    } catch (error) {
      console.log('Error while fetching users from server', error);
    }
  };

  // Add user function
  const addUserFun = async () => {
    let apiUrl = 'http://localhost:5050/user/save';
    try {
      let res = await axios.post(apiUrl, { userName, email, password, role });
      if (res.status === 200) {
        console.log('User added successfully');
        setUserName('');
        setEmail('');
        setPassword('');
        setRole('');
        fetcUsers(); // Refresh list after addition
      }
    } catch (error) {
      console.log('Error while adding new user:', error);
    }
  };

  // Delete user function
  const deleteUser = async (item) => {
    console.log(item)
    const uid = item._id;
    console.log('deleting uid....',uid)
    let apiUrl = `http://localhost:5050/user/deleteUser/${uid}`;

    try {
      let del = await axios.delete(apiUrl);
      if (del.status === 200) {
        console.log('User deleted successfully');
        // Update state locally or re-fetch from database
        // setData((prevData) => prevData.filter((user) => user._id !== uid));
        fetcUsers()
      }
    } catch (error) {
      console.log('Error while deleting user from mongoDB', error);
    }
  };
  //update data in database from browser 
  const updateUser = async (item) => {
    console.log(item)
    const uid = item._id;
    console.log('deleting uid....',uid)
    let apiUrl = `http://localhost:5050/user/updateUser/${uid}`;

    try {
      let del = await axios({
        url : apiUrl,
        method : 'PUT',
        updateName : 
      })
      if (del.status === 200) {
        console.log('User deleted successfully');
        // Update state locally or re-fetch from database
        // setData((prevData) => prevData.filter((user) => user._id !== uid));
        fetcUsers()
      }
    } catch (error) {
      console.log('Error while deleting user from mongoDB', error);
    }
  };

  useEffect(() => {
    fetcUsers();
  }, []);
 console.log(data)
  return (
    <div>
      <h1>API Integration</h1>
      <input 
        type="text" 
        placeholder="Enter userName here" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
      /><br/>

      <input 
        type="email" 
        placeholder="Enter email address here" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      /><br/>

      <input 
        type="password" 
        placeholder="Enter password here" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      /><br/>

      <input 
        type="text" 
        placeholder="Enter role ('student' or 'trainer')" 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
      /><br/>

      <button onClick={addUserFun}>Add User</button>

      <div>
        <ul style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
          {data?.map((item) => (
            <li key={item._id} style={{ display: 'flex', gap: '20px' }}>
              <span>{item.userName}</span>
              <span>{item.email}</span> 
              <span>{item.role}</span>
              <span>
                <button onClick={() => deleteUser(item)}>Delete User</button>
              </span>
              <span>
                <button onClick={() => updateUser(item)}>update user</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;