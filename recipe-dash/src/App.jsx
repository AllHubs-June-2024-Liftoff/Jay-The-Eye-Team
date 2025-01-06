import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';

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