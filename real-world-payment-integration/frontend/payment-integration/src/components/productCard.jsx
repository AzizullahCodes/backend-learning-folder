import React from 'react';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const handleCheckout = async () => {
    const apiUrl = 'http://localhost:5000/create-checkout-session';
    try {
      const response = await axios({
        url: apiUrl,
        method: 'POST',
        data: { productId: product.id }, // ✅ sirf ID bhej rahe hain, price nahi
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Rs. {product.price}</p>
      <button onClick={handleCheckout}>Buy Now</button>
    </div>
  );
};

export default ProductCard;