import React from "react";
import { Routes, Route } from 'react-router-dom';
import ProductCard from "./components/ProductCard";
import Success from "./pages/success";
import Cancel from "./pages/cancel";
import products from "./data/products";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Stripe Store</h1>
            <div>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        }
      />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  );
};

export default App;