import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPet from './assets/AddPet';
import Nav from './assets/Nav';
import PetList from './assets/PetList';
import ViewLog from './assets/ViewLog';
import AddLog from './assets/AddLog';

import './scss/style.scss';
import Footer from './assets/Footer';


function App() {
  

  return (
    <Router>
        <>
          <Nav />
          <Routes>
            <Route path="/AddPet" element={<AddPet />} />
            <Route path="/ViewLog/:id" element={<ViewLog />} />
            <Route path="/AddLog/:id" element={<AddLog />} />
            <Route path="/" element={<PetList />} />
          </Routes>
          <Footer/>
        </>
    </Router>
  );
}

export default App;
