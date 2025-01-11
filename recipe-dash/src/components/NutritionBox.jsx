import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams to get the plateId from the URL

const NutritionBox = ({ plates }) => {
  const { plateId } = useParams();  // Extract plateId from the URL
  const [urlValid, setUrlValid] = useState(null);
  const [plateName, setPlateName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!plateId) {
      setErrorMessage('Plate ID is missing.');
      setLoading(false);
      return;
    }

    // Find the plate name from plates array
    const plate = plates?.find((p) => p.id === Number(plateId));
    if (plate) {
      setPlateName(plate.name);
    } else {
      setErrorMessage('Plate not found.');
      setLoading(false);
    }
  }, [plateId, plates]);

  useEffect(() => {
    const checkUrl = async () => {
      if (!plateName) return;

      const url = `https://www.nutritionix.com/food/${plateName}`;
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          setUrlValid(true);  // Valid URL
        } else {
          setUrlValid(false); // 404 or other error code
        }
      } catch (error) {
        setUrlValid(false); // Network error
      } finally {
        setLoading(false); // Finish loading
      }
    };

    checkUrl();
  }, [plateName]);

  if (loading) {
    return <CircularProgress size={24} color="inherit" />; // Loading spinner
  }

  if (errorMessage) {
    return <Typography variant="h6">{errorMessage}</Typography>;
  }

  if (urlValid === false) {
    return <Typography variant="h6">Page not found (404)</Typography>;  // Handle 404 error
  }

  if (urlValid === null) {
    return <div>Checking the page...</div>;  // In case URL is still being checked
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0', padding: 2 }}>
      <Container>
        <iframe
          src={`https://www.nutritionix.com/food/${plateName}`}
          style={{ width: '110%', height: '740px', border: 'none' }}
          frameBorder="0"
          scrolling="no"
        />
      </Container>
    </Box>
  );
};

export default NutritionBox;