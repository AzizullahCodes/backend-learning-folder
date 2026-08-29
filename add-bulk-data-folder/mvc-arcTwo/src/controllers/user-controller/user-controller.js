// All user related controller functions are defined here...!
import ProductsModal from "../../modals/user-modal/user-modal.js";


// const addBulkProducts = async (req, res) => {
//     try {
//         const { products } = req.body;   // frontend/Postman se array aayega

//         if (!products || !Array.isArray(products)) {
//             return res.status(400).send({
//                 status: false,
//                 message: 'products array required in request body'
//             });
//         }

//         const insertData = await ProductsModal.insertMany(products);

//         return res.status(200).send({
//             status: true,
//             message: `${insertData.length} products added successfully`
//         });
//     } catch (error) {
//         console.log(`Error while adding bulk products: ${error}`);
//         return res.status(500).send({
//             status: false,
//             message: 'Error while adding bulk products'
//         });
//     }
// };

// export { addBulkProducts };

const addBulkProducts =  async(req,res)=>{
    try{
 const {products} = req.body;
 if(!products || !Array.isArray(products)){
    return res.status(400).send({
        status : false,
        message : 'products are required in request.body from client side'
    })
 }

 const insertData = await ProductsModal.insertMany(products)
 if(insertData){
    return res.status(200).send({
        status : true,
        message : ` ${insertData.length} products added successfully to mongo db database`
    })
 }
    }
    catch(error){
        console.log(`error while adding bulk products ${error}`);
        return res.status(500).send({
            status : false,
            message : 'Error while adding bulk prodcts data'
        })
    }
}

// pagination 
// const fetchUsers = async (req, res) => {
//     try {
//         const { pageVal, limitVal } = req.query;
//         console.log(`Page: ${pageVal}. Limit: ${limitVal}`);

//         const page = Number(pageVal) || 1;
//         const limit = Number(limitVal) || 10;
//         const skip = (page - 1) * limit;

//         const countsData = await UserModal.countDocuments();
//         const fetchData = await UserModal
//             .find()
//             .skip(skip)
//             .limit(limit);
            
//         return res.status(200).send({
//             status: true,
//             message: "Users",
//             data: {
//                 users: fetchData,
//                 count: countsData,
//                 page: page,
//                 skip: skip
//             }
//         });
//     }

//     catch (error) {
//         console.log(`Err while fetching user: ${error}`);
//         return res.status(500).send({
//             status: false,
//             message: "Err while fetching user!"
//         });
//     };
// };


const fetchUsers = async(req,res)=>{
    try{
        const {pageVal,limitVal} = req.query;
        console.log(`page value is ${pageVal} 
            limit value is : ${limitVal}`)

            const page = Number(pageVal) || 1;
            const limit = Number(limitVal) || 10;
            const skip = (page - 1) * 10;

            const countsData = await ProductsModal.countDocuments();
            const fetchData = await ProductsModal
            .find()
            .skip(skip)
            .limit(limit)
      
            res.status(200).send({
                status : true,
                message : 'users data fectched successfully using pagination concept',
                data : {
                    users : fetchData,
                    count : countsData,
                    page : page,
                    skip : skip
                }
            })
    }
    catch(error){
        console.log(`Error while fetching users  : ${error}`);
        return res.status(500).send({
            status : false,
            message : 'Error while fetching user!'
        })
    }
}
export {addBulkProducts ,fetchUsers}