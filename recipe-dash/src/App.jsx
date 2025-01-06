import './App.css';
import React from 'react';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Homepage from './pages/Homepage';
import Plate from './pages/Plate';

function App() {
  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
