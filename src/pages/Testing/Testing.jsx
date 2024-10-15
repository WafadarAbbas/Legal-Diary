import React, { useState } from 'react';
import axios from 'axios';

const Testing = () => {
  const [imageString, setImageString] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the image string (Base64 format) in the state
        setImageString(reader.result);
      };
      reader.readAsDataURL(file); // Convert file to Base64 string
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        profileImage: imageString,
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Image String:</h3>
        <textarea
          rows="5"
          value={imageString}
          readOnly
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default Testing;

