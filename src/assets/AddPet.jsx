import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/AddPet.scss';

const AddPet = () => {
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: '',
    birthday: '',
    email: '',
  });

  const [dob, setDob] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });

    if (name === 'birthday') {
      setDob(new Date(value).toLocaleDateString('lt'));
    }
  };

  const handleAddPet = async () => {
    try {
      console.log('Request Payload:', { ...petData, dob });
  
      const response = await fetch('https://vetbee-backend.glitch.me/v1/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...petData, dob }),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Assuming the response includes the newly added pet's id
        const { id: petId } = responseData;
  
        alert('Gyvūnas pridėtas :) !');
  
        setPetData({
          name: '',
          birthday: '',
          email: '',
        });
  
        navigate('/');
  
        // Redirect to the page for adding logs with the pet_id
        navigate(`/AddLog/${petId}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to add pet:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
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
          name="birthday"
          value={petData.birthday}
          onChange={handleInputChange}
          required
        />
        <h3>Pet Email</h3>
        <input
          type="email"
          placeholder="lockis@gmail.com"
          name="email"
          value={petData.email}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleAddPet}>ADD PET</button>
      </div>
    </>
  );
};

export default AddPet;
