import React, { useState, useEffect } from 'react';
import { Stack, Box, CircularProgress, Snackbar, Typography, Alert, Container } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams to get the plateId from the URL
import chefsImage from '../assets/images/aboutchfs.png';

const APP_ID = '38e196c9';
const APP_KEY = '8681b74895d4640002ed9cd4fd7ca4ce';

const NutritionBox = ({ plates }) => {
  const { plateId } = useParams();  // Extract plateId from the URL

  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check if plates are available and find the plate by plateId
  const plateName = plates?.find((p) => p.id === Number(plateId))?.name;

  useEffect(() => {
    if (!plateName) {
      setErrorMessage('Plate not found.');
      return;
    }
    fetchNutritionData(`1 plate of ${plateName}`); // Send plate name as ingredient
  }, [plateName]);

  const fetchNutritionData = async (ingredient) => {
    if (!ingredient) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const bodyIngredient = JSON.stringify({
      ingr: [ingredient],
    });

    try {
      const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyIngredient,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch nutritional data. Request body: ${bodyIngredient}`);
      }

      const data = await response.json();
      setNutritionData(data);
      setSuccessMessage('Nutritional data fetched successfully!');
    } catch (error) {
      setErrorMessage(`An error occurred while fetching nutritional data. Request body: ${bodyIngredient}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Check if plates are still undefined or empty
  if (!plates || plates.length === 0) {
    return <Typography variant="h6">No plates available.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : nutritionData ? (
        <Box
          sx={{
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: 2,
            width: '300px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#fff',
            lineHeight: '1.5',
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '1.2rem',
                borderBottom: '2px solid #000',
                paddingBottom: 1,
              }}
            >
              Nutrition Facts
            </Typography>

            <Box sx={{ paddingTop: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#DAA520',
                }}
              >
                <strong>Calories:</strong> {nutritionData.totalNutrients.ENERC_KCAL?.quantity?.toFixed(2) || 'N/A'}{' '}
                {nutritionData.totalNutrients.ENERC_KCAL?.unit || 'N/A'}
              </Typography>

              <Box sx={{ borderTop: '1px solid #ddd', paddingTop: 2, marginTop: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                  <strong>Total Fat:</strong> {nutritionData.totalNutrients.FAT?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.FAT?.unit || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  <strong>Saturated Fat:</strong> {nutritionData.totalNutrients.FASAT?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.FASAT?.unit || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  <strong>Cholesterol:</strong> {nutritionData.totalNutrients.CHOLE?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.CHOLE?.unit || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  <strong>Sodium:</strong> {nutritionData.totalNutrients.SODIUM?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.SODIUM?.unit || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  <strong>Total Carbohydrate:</strong> {nutritionData.totalNutrients.CHOCDF?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.CHOCDF?.unit || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  <strong>Dietary Fiber:</strong> {nutritionData.totalNutrients.FIBTG?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.FIBTG?.unit || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  <strong>Total Sugars:</strong> {nutritionData.totalNutrients.SUGAR?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.SUGAR?.unit || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  <strong>Protein:</strong> {nutritionData.totalNutrients.PROCNT?.quantity?.toFixed(2) || ''}{' '}
                  {nutritionData.totalNutrients.PROCNT?.unit || 'N/A'}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.6rem',
                  fontStyle: 'italic',
                  marginTop: 2,
                  textAlign: 'center',
                }}
              >
                *Percent Daily Values are based on a 2000 calorie diet
              </Typography>
            </Box>
          </Stack>
        </Box>
      ) : (
          <Container>
                <div>
                      <iframe
                        src="https://www.nutritionix.com/i/nutritionix/ceviche-1-cup/5665af6c26bdc9355375b645"
                        style={{ width: '110%', height: '500px', border: 'none' }}
                        frameBorder="0"
                      />
                </div>
        </Container>
      )}

      {/* Show success or error message */}
      {/*
      <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      */}
    </Box>
  );
};

export default NutritionBox;