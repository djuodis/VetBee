import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewLog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [petLogs, setPetLogs] = useState([]);
  const [petName, setPetName] = useState('');

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch pet data');
        }

        const data = await response.json();
        setPetName(data.name);
      } catch (error) {
        console.error('Error fetching pet data:', error.message);
      }
    };

    const fetchPetLogs = async () => {
      try {
        const response = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch pet logs');
        }

        const data = await response.json();
        setPetLogs(data);
      } catch (error) {
        console.error('Error fetching pet logs:', error.message);
      }
    };

    fetchPetData();
    fetchPetLogs();
  }, [id]);

  return (
    <>
      <header>
        <h1>{petName}: Health Records</h1>
        <div className="buttons">
          <Link to={`/AddLog/${id}`} className="addLog">
            ADD LOG
          </Link>
          <Link to="/" className="goBack">
            GO BACK
          </Link>
        </div>
      </header>

      <main>
        <div className="cards">
          {petLogs.map((log, index) => (
            <div className="card" key={`${log.id}-${index}`}>
              <h2>{log.status}</h2>
              <p>{log.description}</p>
              <p className="date">{log.date}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ViewLog;