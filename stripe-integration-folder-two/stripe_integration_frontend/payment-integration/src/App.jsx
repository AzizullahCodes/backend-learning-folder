import React from "react";
import {Routes,Route} from 'react-router-dom';
import ProductCard from "./components/productCard";
import Success from "./pages/success";
import Cancel from "./pages/cancel";
const App = ()=>{
  //make temporary product 
  const products = [
  {
    name: "React T-shirt",
    image: "https://placehold.co/400x400/6366f1/white?text=React+T-shirt",
    price: 20
  },
  {
    name: "Node js hoodie",
    image: "https://placehold.co/400x400/22c55e/white?text=Node+Hoodie",
    price: 15
  },
  {
    name: "Fullstack mug",
    image: "https://placehold.co/400x400/f59e0b/white?text=Fullstack+Mug",
    price: 15
  }
];
  return(
    <Routes>
     <Route path="/" element={
      <div>
        <h1>Stripe Store</h1>
        <div>
          {
            products.map((product,index)=>{
           return   <ProductCard key={index} product={product}/>

            })
          }
        </div>
      </div>
     }
     />

     {/* route for success/cancel */}
     <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel/>} />

    </Routes>
  )
}
export default App;