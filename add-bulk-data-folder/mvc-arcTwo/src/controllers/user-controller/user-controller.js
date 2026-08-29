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

export {addBulkProducts}