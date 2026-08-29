'use client'
import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  // State for bulk data (raw JSON text from textarea)
  const [bulkData, setBulkData] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);

  // Add Bulk Products function
  const addBulkProductsFun = async () => {
    let apiUrl = 'http://localhost:5051/add-bulk-products';

    try {
      // Textarea se JSON string ko array mein parse karo
      const parsedProducts = JSON.parse(bulkData);

      if (!Array.isArray(parsedProducts)) {
        alert('Data must be a valid JSON array of product objects');
        return;
      }

      setBulkLoading(true);
      let res = await axios.post(apiUrl, { products: parsedProducts }); // 👈 key "products" (backend ke req.body.products se match)

      if (res.status === 200) {
        console.log('Bulk products added successfully');
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

  return (
    <div>
      <h1>Add Bulk Products</h1>

      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <p style={{ fontSize: '12px', color: 'gray' }}>
          Paste a JSON array of product objects, e.g.:<br />
          {`[{"name":"Laptop","price":55000,"category":"Electronics","stock":20}]`}
        </p>
        <textarea
          rows={10}
          style={{ width: '100%' }}
          placeholder='Paste JSON array here...'
          value={bulkData}
          onChange={(e) => setBulkData(e.target.value)}
        />
        <br />
        <button onClick={addBulkProductsFun} disabled={bulkLoading}>
          {bulkLoading ? 'Adding...' : 'Add Bulk Products'}
        </button>
      </div>
    </div>
  );
};

export default Home;