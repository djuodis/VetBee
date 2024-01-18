import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AddLog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [petName, setPetName] = useState('');

  useEffect(() => {
    const fetchPetName = async () => {
      try {
        const response = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch pet name');
        }

        const data = await response.json();
        setPetName(data.name);
      } catch (error) {
        console.error('Error fetching pet name:', error.message);
      }
    };

    fetchPetName();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://vetbee-backend.glitch.me/v1/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pet_id: id, 
          status: event.target.status.value,
          description: event.target.description.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add a new log');
      }

      navigate(`/ViewLog/${id}`);
    } catch (error) {
      console.error('Error adding a new log:', error.message);
    }
  };

  return (
    <>
      <header>
        <h1>{petName}: Health Log</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <h2>Status</h2>
          <textarea type="text" name="status" placeholder="Huberium Cellulitus" required />

          <h2>Description</h2>
          <textarea className="description" type="text" name="description" placeholder="Removed some fat..." required />

          <div className="buttons">
            <Link to={`/ViewLog/${id}`} className="go_Back">
              GO BACK
            </Link>
            <button type="submit" className="add__Log">
              ADD LOG
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddLog;
