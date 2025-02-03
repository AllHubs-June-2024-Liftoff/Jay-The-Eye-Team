import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Components
import Navbar from './components/Navbar';

// Pages
import Homepage from './pages/Homepage';
import Plate from './pages/Plate';

// Store
import { store, persistor } from './store/store';
import { login } from './store/userSlice';

function App() {
  const dispatch = useDispatch();

  // This effect will run on initial load to check if the user is already logged in
  useEffect(() => {

    const savedUserData = localStorage.getItem('userData');

    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      dispatch(login({
        loginStatus: true,
      }));
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/plate" element={<Plate />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
