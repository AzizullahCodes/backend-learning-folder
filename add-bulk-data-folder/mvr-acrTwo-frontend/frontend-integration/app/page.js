// 'use client'
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   // State for bulk data (raw JSON text from textarea)
//   const [bulkData, setBulkData] = useState('');
//   const [bulkLoading, setBulkLoading] = useState(false);
//   //fetch user handling states
//   const [userData,setUserData] = useState([]);
//   const [pageNumber,setPageNumber] = useState('0');

//   // Add Bulk Products function
//   const addBulkProductsFun = async () => {
//     let apiUrl = 'http://localhost:5051/add-bulk-products';

//     try {
//       // Textarea se JSON string ko array mein parse karo
//       const parsedProducts = JSON.parse(bulkData);

//       if (!Array.isArray(parsedProducts)) {
//         alert('Data must be a valid JSON array of product objects');
//         return;
//       }

//       setBulkLoading(true);
//       let res = await axios.post(apiUrl, { products: parsedProducts }); // 👈 key "products" (backend ke req.body.products se match)

//       if (res.status === 200) {
//         console.log('Bulk products added successfully');
//         alert(res.data.message || 'Bulk products added successfully');
//         setBulkData('');
//       }
//     } catch (error) {
//       console.log('Error while adding bulk products:', error);
//       alert('Invalid JSON or server error — check console');
//     } finally {
//       setBulkLoading(false);
//     }
//   };

//   //fetch user from mongo db using pagination concept 
//   const fetchUserHanlder = async()=>{
//     console.log(pageNumber)
//     try{
// const apiUrl = `http://localhost:5051/users/fetch?pageVal=${pageNumber}&limitVal=10`;
// let res = await axios({
//   url : apiUrl,
//   method : 'GET'
// })
// // console.log(res?.data?.data?.users)
// let requiredUser = res?.data?.data?.users;
// // console.log(requiredUser);
// console.log('users lenght  : ', requiredUser.length)
// console.log(requiredUser)
// requiredUser && setUserData(requiredUser)
// // requiredUser && setUserData(requiredUser)

//     }
//     catch(error){
//       console.log(`an error occured while fetching users from mongoDB using pagintation : ${error}`)
      
//     }
//   }
//  useEffect(()=>{
//   fetchUserHanlder()
//   console.log(userData)
//  },[])
//   return (
//     <div>
//       <h1>Add Bulk Products</h1>

//       <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '15px' }}>
//         <p style={{ fontSize: '12px', color: 'gray' }}>
//           Paste a JSON array of product objects, e.g.:<br />
//           {`[{"name":"Laptop","price":55000,"category":"Electronics","stock":20}]`}
//         </p>
//         <textarea
//           rows={10}
//           style={{ width: '100%' }}
//           placeholder='Paste JSON array here...'
//           value={bulkData}
//           onChange={(e) => setBulkData(e.target.value)}
//         />
//         <br />
//         <button onClick={addBulkProductsFun} disabled={bulkLoading}>
//           {bulkLoading ? 'Adding...' : 'Add Bulk Products'}
//         </button>
//       </div>

//       {/* fetchUserHandler part */}
//       <select id="pageSelect" onChange={(e)=>setPageNumber(e.target.value)}>
//   <option value="1">Page 1</option>
//   <option value="2">Page 2</option>
//   <option value="3">Page 3</option>
//   <option value="4">Page 4</option>
// </select>
//       <button onClick={fetchUserHanlder}>fetch user</button>

//       {/*  show users  */}
//       {
//         userData?.map((item)=>{
//           return <li key={item._id}>{item.name}</li>
//         })
//       }
//     </div>
//   );
// };

// export default Home;



'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import './home.css'

const Home = () => {
  const [bulkData, setBulkData] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState('1');
  const [fetchLoading, setFetchLoading] = useState(false);

  const addBulkProductsFun = async () => {
    let apiUrl = 'http://localhost:5051/add-bulk-products';
    try {
      const parsedProducts = JSON.parse(bulkData);
      if (!Array.isArray(parsedProducts)) {
        alert('Data must be a valid JSON array of product objects');
        return;
      }
      setBulkLoading(true);
      let res = await axios.post(apiUrl, { products: parsedProducts });
      if (res.status === 200) {
        alert(res.data.message || 'Bulk products added successfully');
        setBulkData('');
      }
    } catch (error) {
      console.log('Error while adding bulk products:', error);
      alert('Invalid JSON or server error — check console');
    } finally {
      setBulkLoading(false);
    }
  };

  const fetchUserHanlder = async () => {
    setFetchLoading(true);
    try {
      const apiUrl = `http://localhost:5051/users/fetch?pageVal=${pageNumber}&limitVal=10`;
      let res = await axios({ url: apiUrl, method: 'GET' });
      let requiredUser = res?.data?.data?.users;
      requiredUser && setUserData(requiredUser);
    } catch (error) {
      console.log(`an error occured while fetching users : ${error}`);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchUserHanlder();
  }, []);

  return (
    <div className="page-container">
      <div className="wrapper">

        {/* Add Bulk Products Card */}
        <div className="card">
          <div className="card-header">
            <h1>Add Bulk Products</h1>
            <p className="subtitle">Paste a JSON array of product objects</p>
          </div>

          <div className="hint-box">
            <code>{`[{"name":"Laptop","price":55000,"category":"Electronics","stock":20}]`}</code>
          </div>

          <textarea
            rows={8}
            className="json-textarea"
            placeholder='Paste JSON array here...'
            value={bulkData}
            onChange={(e) => setBulkData(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={addBulkProductsFun}
            disabled={bulkLoading}
          >
            {bulkLoading ? (
              <span className="btn-loading">
                <span className="spinner"></span> Adding...
              </span>
            ) : (
              'Add Bulk Products'
            )}
          </button>
        </div>

        {/* Fetch Users Card */}
        <div className="card">
          <div className="card-header">
            <h1>Users List</h1>
            <p className="subtitle">Fetch users with pagination</p>
          </div>

          <div className="controls-row">
            <select
              className="page-select"
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value)}
            >
              <option value="1">Page 1</option>
              <option value="2">Page 2</option>
              <option value="3">Page 3</option>
              <option value="4">Page 4</option>
              <option value="5">page 5</option>
            </select>

            <button className="btn btn-secondary" onClick={fetchUserHanlder}>
              Fetch Users
            </button>
          </div>

          <div className="user-list">
            {fetchLoading ? (
              <p className="empty-state">Loading users...</p>
            ) : userData?.length > 0 ? (
              userData.map((item) => (
                <div className="user-item" key={item._id}>
                  <span className="user-avatar">{item.name?.charAt(0).toUpperCase()}</span>
                  <div className="user-info">
                    <span className="user-name">{item.name}</span>
                    {item.category && <span className="user-meta">{item.category}</span>}
                  </div>
                  {item.price && <span className="user-price">₹{item.price}</span>}
                </div>
              ))
            ) : (
              <p className="empty-state">No users found on this page</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;