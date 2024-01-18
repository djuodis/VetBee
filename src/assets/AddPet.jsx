import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/AddPet.scss';

const AddPet = () => {
  const navigate = useNavigate();
  const [petData, setPetData] = useState({
    name: '',
    dob: '', 
    client_email: '',
  });

  const handleInputChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPet = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('https://vetbee-backend.glitch.me/v1/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { id: petId } = responseData;

        alert('Pet added successfully!');

        setPetData({
          name: '',
          dob: '',
          client_email: '',
        });

        navigate('/');
        
      } else {
        const errorData = await response.json();
        console.error('Failed to add pet:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="addPet">
      <h1>Add Your Pet</h1>
      <h3>Pet Name:</h3>
      <input
        type="text"
        placeholder="Lockis"
        name="name"
        value={petData.name}
        onChange={handleInputChange}
        required
      />
      <h3>Pet Birthday:</h3>
      <input
        type="date"
        name="dob"
        value={petData.dob}
        onChange={handleInputChange}
        required
      />
      <h3>Pet Email</h3>
      <input
        type="email"
        placeholder="lockis@gmail.com"
        name="client_email"
        value={petData.client_email}
        onChange={handleInputChange}
        required
      />
      <button onClick={handleAddPet}>ADD PET</button>
    </div>
  );
};

export default AddPet;
