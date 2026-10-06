// 'use client'
// import React, { useState } from "react";
// import axios from "axios";
// const UsersFetching = ()=>{
//  const [data,setData] = useState([])

//   //FetchAllusersHandler function
//   const FetchAllusersHandler = async () => {
//     console.log('workign')
//   try {
//     const apiUrl = '/api/test/fetch/allusers'

   

//     const res = await axios({
//       url: apiUrl,
//       method: 'GET'
      
//     })
//     // console.log(res)
//     // console.log(res?.data?.data) 
//     let fetchedData = res?.data?.data
//     fetchedData && setData(fetchedData)
    
//   } catch (error) {
//     console.log('error while fetching users....', error)
  
//   }
// }
// console.log(data)
//   return(
//     <div>
//       <h1>users page</h1>
// <ul>
//     {
//         data?.map((item)=>{
//             return <li key='_id'>{item.userName}</li>
//         })
//     }
// </ul>
     

// <button onClick={FetchAllusersHandler}>get users</button>
//     </div>
//   )
// }
// export default UsersFetching

'use client'
import React, { useState } from 'react'
import { fetchAllNewUseres } from '../action'

const UsersFetching = ()=>{
  const [data,setData] = useState([])

  const userHandler = async()=>{
     const result = await fetchAllNewUseres()
     console.log('resul...',result.data)
     result.data && setData(result.data)
  }

  return(
    <div>
      <h2>Fetching all user page</h2>
      <button onClick={userHandler}>get All users</button>
      <ul>
        {
          data?.map((item)=> {
            return <li key={item._id}>{item.userName}</li>
          })
        }
      </ul>
    </div>
  )
}
export default UsersFetching