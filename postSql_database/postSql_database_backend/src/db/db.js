//db.js 
import pg from 'pg';
const {Pool} = pg;

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    port : 5432,
    database : "postgres",
    password : "admin123"

})

pool.connect()
.then((res)=>{
    console.log('postgres database connected successfully');
    res.release()
})

.catch((error)=>{
    console.log('Error while connecting postgres database ',error)
})

export default pool