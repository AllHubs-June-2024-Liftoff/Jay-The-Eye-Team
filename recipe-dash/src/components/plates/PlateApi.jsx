import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlateApi = ({ onFetchPlates, onError }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/plates/api')
      .then((response) => {
        onFetchPlates(response.data); // Send data to parent component
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching plates:', error);
        const errorMessage = 'Failed to load plates. Please check your connection.';
        setError(errorMessage);
        onError?.(errorMessage); // Send error message to parent component
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div>Loading plates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default PlateApi;

