import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlateApi = ({ onFetchPlates, onError }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/plates/api')
      .then(response => {
        onFetchPlates(response.data);  // Pass fetched plates to the parent component
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plates:', error);
        const errorMessage = '[PlateAPi] Failed to load plates. Crosscheck you are on http://localhost:5173';
        setError(errorMessage);
        setLoading(false);
        onError(errorMessage);  // Pass error to parent component
      });
  }, [onFetchPlates, onError]);

  if (loading) {
    return <div>Loading plates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default PlateApi;
