import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file change
  const handleFileChange = (e) => {
    // Fix: e.target.files instead of e.target.file
    setFile(e.target.files[0]);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return; // Fix: return immediately so upload logic runs when a file exists
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5050/api/uploads', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage(res.data.message);
    } catch (error) {
      // Fix: correct expression grouping for fallback error message
      setMessage(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h1>Multer Testing</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;