import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { BrowserRouter, Link, Routes, Route, useNavigate } from "react-router-dom";

// Components
import Navbar from './components/Navbar';

// Pages
import Homepage from './pages/Homepage';
import Plate from './pages/Plate';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
    </BrowserRouter>
  );
}

export default App;