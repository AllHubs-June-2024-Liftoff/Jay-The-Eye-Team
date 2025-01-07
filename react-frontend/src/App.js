/* COLORS
    DAA520 - Yellowy
    1A2C4B - Bluey
    C05746 - Reddy
    F8EEEC - Lighter red
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Plate from './pages/Plate';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plate/:plateId" element={<Plate />} /> {/* The individual plate details page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;