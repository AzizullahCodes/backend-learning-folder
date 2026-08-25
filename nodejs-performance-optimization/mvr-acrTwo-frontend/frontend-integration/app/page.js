// 'use client'
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   //state for edit and update purpose 
//   const [editingId,setEditingId] = useState(null);
//   const [isEdit,setIsEdit] = useState(false)


//   // // Fetch users from MongoDB server
//   // const fetcUsers = async () => {
//   //   let dbUrl = 'http://localhost:5050/user/fetchUser';
//   //   try {
//   //     let getData = await axios.get(dbUrl);
//   //     if (getData?.data?.data) {
//   //       setData(getData.data.data);
//   //     }
//   //   } catch (error) {
//   //     console.log('Error while fetching users from server', error);
//   //   }
//   // };


//   //fetch User by id section start 
// // Fetch a single user by ID from MongoDB server
// const fetchUserById = async (id) => {
//   let dbUrl = `http://localhost:5050/user/fetchUser/${id}`;
//   try {
//     let getData = await axios.get(dbUrl);
//     if (getData?.data?.data) {
//       setData(getData.data.data);
//     }
//   } catch (error) {
//     console.log('Error while fetching user by id from server', error);
//   }
// };
//   //fetch user by id section ends
//   // Add user function
//   const addUserFun = async () => {
//     let apiUrl = 'http://localhost:5050/user/save';
//     try {
//       let res = await axios.post(apiUrl, { userName, email, password, role });
//       if (res.status === 200) {
//         console.log('User added successfully');
//         setUserName('');
//         setEmail('');
//         setPassword('');
//         setRole('');
//         fetcUsers(); // Refresh list after addition
//       }
//     } catch (error) {
//       console.log('Error while adding new user:', error);
//     }
//   };

//   // Delete user function
//   const deleteUser = async (item) => {
//     console.log(item)
//     const uid = item._id;
//     console.log('deleting uid....',uid)
//     let apiUrl = `http://localhost:5050/user/deleteUser/${uid}`;

//     try {
//       let del = await axios.delete(apiUrl);
//       if (del.status === 200) {
//         console.log('User deleted successfully');
//         // Update state locally or re-fetch from database
//         // setData((prevData) => prevData.filter((user) => user._id !== uid));
//         fetcUsers()
//       }
//     } catch (error) {
//       console.log('Error while deleting user from mongoDB', error);
//     }
//   };
//   //startEditing function 
//   const startEditing = (item)=>{
//     setIsEdit(true)
//     setEditingId(item._id)
// setUserName(item.userName)
//   }
//   //update data in database from browser 
//   const updateUser = async () => {
//     // console.log(item)
//     // const uid = item._id;
//     // console.log('deleting uid....',uid)
//     let apiUrl = `http://localhost:5050/user/updateUser/${editingId}`;

//     try {
//       let update = await axios.put(
//         apiUrl,
//         {updateName : userName}
//       )
//       if (update.status === 200) {
//         console.log('User name updated  successfully');
//          setIsEdit(false)
//     setEditingId(null)
// setUserName('')
// fetcUsers()
//       }
//     } catch (error) {
//       console.log('Error while deleting user from mongoDB', error);
//     }
//   };
// //cancel Edit function 
// const cancelEdit = ()=>{
//   setIsEdit(false)
//     setEditingId(null)
// setUserName('')
// }
// //   useEffect(() => {
// //     fetcUsers();
// //   }, []);
// //  console.log(data)


// useEffect(() => {
//   fetchUserById('6a8d44cf55eacc71bb156b1a'); // static id
// }, []);
//   return (
//     <div>
//       <h1>API Integration</h1>
//       <input 
//         type="text" 
//         placeholder="Enter userName here" 
//         value={userName} 
//         onChange={(e) => setUserName(e.target.value)} 
//       /><br/>

//       <input 
//         type="email" 
//         placeholder="Enter email address here" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)} 
//       /><br/>

//       <input 
//         type="password" 
//         placeholder="Enter password here" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//       /><br/>

//       <input 
//         type="text" 
//         placeholder="Enter role ('student' or 'trainer')" 
//         value={role} 
//         onChange={(e) => setRole(e.target.value)} 
//       /><br/>

//       {/* <button onClick={addUserFun}>Add User</button> */}
//      {
//        (isEdit)?(<><button onClick={updateUser}>update user</button> 
//        <button onClick={cancelEdit}>cancel Edit</button></>): (<button onClick={addUserFun}>Add User</button>)
//      }

//       <div>
//         <ul style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
//           {data?.map((item) => (
//             <li key={item._id} style={{ display: 'flex', gap: '20px' }}>
//               <span>{item.userName}</span>
//               <span>{item.email}</span> 
//               <span>{item.role}</span>
//               <span>
//                 <button onClick={() => deleteUser(item)}>Delete User</button>
//               </span>
//               <span>
//                 <button onClick={() => startEditing(item)}>Edit user</button>
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Home;




'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // static id abhi ke liye — baad me dynamic bana sakte ho (e.g. logged-in user ki id)
  const currentUserId = '6a8d99dcbdddb4c0311ccc91';

  // Fetch a single user by ID from MongoDB server
  const fetchUserById = async (id) => {
    let dbUrl = `http://localhost:5050/user/fetchUser/${id}`;
    try {
      let getData = await axios.get(dbUrl);
      if (getData?.data?.data) {
        // single object aata hai, isliye array me wrap kiya taake .map() chale
        setData([getData.data.data]);
      }
    } catch (error) {
      console.log('Error while fetching user by id from server', error);
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
        fetchUserById(currentUserId); // Refresh after addition
      }
    } catch (error) {
      console.log('Error while adding new user:', error);
    }
  };

  // Delete user function
  const deleteUser = async (item) => {
    const uid = item._id;
    let apiUrl = `http://localhost:5050/user/deleteUser/${uid}`;
    try {
      let del = await axios.delete(apiUrl);
      if (del.status === 200) {
        console.log('User deleted successfully');
        fetchUserById(currentUserId);
      }
    } catch (error) {
      console.log('Error while deleting user from mongoDB', error);
    }
  };

  const startEditing = (item) => {
    setIsEdit(true);
    setEditingId(item._id);
    setUserName(item.userName);
  };

  const updateUser = async () => {
    let apiUrl = `http://localhost:5050/user/updateUser/${editingId}`;
    try {
      let update = await axios.put(apiUrl, { updateName: userName });
      if (update.status === 200) {
        console.log('User name updated successfully');
        setIsEdit(false);
        setEditingId(null);
        setUserName('');
        fetchUserById(currentUserId);
      }
    } catch (error) {
      console.log('Error while updating user in mongoDB', error);
    }
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setEditingId(null);
    setUserName('');
  };

  useEffect(() => {
    fetchUserById(currentUserId);
  }, []);

  return (
    <div>
      <h1>API Integration</h1>
      <input type="text" placeholder="Enter userName here" value={userName} onChange={(e) => setUserName(e.target.value)} /><br/>
      <input type="email" placeholder="Enter email address here" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <input type="text" placeholder="Enter role ('student' or 'trainer')" value={role} onChange={(e) => setRole(e.target.value)} /><br/>

      {isEdit ? (
        <>
          <button onClick={updateUser}>update user</button>
          <button onClick={cancelEdit}>cancel Edit</button>
        </>
      ) : (
        <button onClick={addUserFun}>Add User</button>
      )}

      <div>
        <ul style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
          {data?.map((item) => (
            <li key={item._id} style={{ display: 'flex', gap: '20px' }}>
              <span>{item.userName}</span>
              <span>{item.email}</span>
              <span>{item.role}</span>
              <span><button onClick={() => deleteUser(item)}>Delete User</button></span>
              <span><button onClick={() => startEditing(item)}>Edit user</button></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;