import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewLog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [petLogs, setPetLogs] = useState([]);
  const [petName, setPetName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petResponse = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`);
        const logsResponse = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${id}`);

        if (!petResponse.ok || !logsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const petData = await petResponse.json();
        const logsData = await logsResponse.json();

        setPetName(petData.name);
        setPetLogs(logsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <header>
        <h1>{petName}: Health Records</h1>
        <div className="Buttons">
          <Link to={`/AddLog/${id}`} className="addLog">
            ADD LOG
          </Link>
          <Link to="/" className="goBack">
            GO BACK
          </Link>
        </div>
      </header>

      <main>
        <div className="logs">
          {petLogs.map((log, index) => (
            <div className="log" key={`${log.id}-${index}`}>
              <h2>{log.status}</h2>
              <p>{log.description}</p>
              <p className="date">Added on: {log.date}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ViewLog;
