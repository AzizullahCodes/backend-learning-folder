// User modal structure...!

import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         userName: String,
//         email: {
//             type: String,
//             // unique: true
//         },
//         password: {
//             type: String,
//             required: true
//         },
//         role: {
//             type: String,
//             required: true,
//             enum: ['trainer', 'student']
//         }
//     },
//     {
//          collection: "users", 
         
//         timestamps : true
//     }
// );

// const UserModal = mongoose.model("users", userSchema);
// export default UserModal;


// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String },
//     stock: { type: Number, default: 0 },
//     description: { type: String }
// }, { timestamps: true });


const productSchema = new mongoose.Schema({
    name : { type : String, required : true},
    price : { type : Number, required : true},
    category : { type : String},
    stock : { type : Number, default : 0},
    descrption : { type : String}

},
{
    timestamps : true
})

const ProductsModal = mongoose.model('Products',productSchema)
export default ProductsModal