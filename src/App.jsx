import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPet from './assets/AddPet';
import Nav from './assets/Nav';
import PetList from './assets/PetList';
import ViewLog from './assets/ViewLog';
import AddLog from './assets/AddLog';

import './scss/style.scss';

export const PetContext = createContext();

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('https://vetbee-backend.glitch.me/v1/pets');
        if (response.ok) {
          const petData = await response.json();
          setPets(petData);
        } else {
          console.error('Failed to fetch pets:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <Router>
      <PetContext.Provider value={{ pets, setPets }}>
        <>
          <Nav />
          <Routes>
            <Route path="/AddPet" element={<AddPet />} />
            <Route path="/ViewLog/:id" element={<ViewLog />} />
            <Route path="/AddLog/:id" element={<AddLog />} />
            <Route path="/" element={<PetList />} />
          </Routes>
        </>
      </PetContext.Provider>
    </Router>
  );
}

export default App;
