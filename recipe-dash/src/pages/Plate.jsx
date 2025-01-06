import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom'; // Use useParams to get the plateId from the URL

import PlateApi from '../components/plates/PlateApi';
import ReviewSection from '../components/ReviewSection';

const Plate = () => {
  const { plateId } = useParams(); // Extract plateId from URL params
  const [plates, setPlates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const handleFetchPlates = (data) => {
    setPlates(data);
    setLoading(false);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  // Memoize the filtered plate based on the plateId from the URL
  const filteredPlate = useMemo(() =>
    plates?.find(plate => plate.id === Number(plateId)), [plates, plateId]);

  useEffect(() => {
    setError(null); // Reset error when plateId changes
    setLoading(true); // Reset loading when plateId changes
  }, [plateId]);

  return (
    <Container sx={{ marginTop: 5 }}>
      <PlateApi onFetchPlates={handleFetchPlates} onError={handleError} />

      {loading && <Typography variant="h6" align="center">Loading...</Typography>}
      {error && <Typography variant="h6" color="error">{error}</Typography>}

      <Grid container spacing={2} alignItems="center">

        {/* First row - Left Column - Display Plate*/}
        <Grid item xs={6} sx={{ margin: '0', padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Container>
                {/* Display the specific plate if it exists */}
                {filteredPlate ? (
                  <Grid container direction="column" spacing={1}>
                    {/* Image */}
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left' }}>
                      <img
                        src={filteredPlate.plateImage}
                        alt={`${filteredPlate.name}`}
                        style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px', display: 'block' }}
                      />
                    </Grid>

                    {/* Details */}
                    <Grid item xs={12}>
                      <Typography variant="h4" component="div" gutterBottom style={{ textAlign: 'left' }}>
                        {filteredPlate.name}
                      </Typography>
                      <Typography variant="p" component="div" gutterBottom style={{ marginTop: '1px', textAlign: 'left', fontStyle: 'italic' }}>
                        {filteredPlate.description}
                      </Typography>

                      <Box display="flex" alignItems="center" marginTop="15px">
                        <Typography variant="body2" color="text.primary" textAlign="right" marginRight="15px" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                          ${filteredPlate.price}
                        </Typography>

                        <Box display="flex" alignItems="left">
                          {filteredPlate.discount > 0 && (
                            <Box bgcolor="black" color="#DAA520" p={0.75} display="flex" borderRadius={1} marginLeft="10px" alignItems="center" sx={{ fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
                              {filteredPlate.discount}% off
                            </Box>
                          )}
                        </Box>

                      </Box>

                    </Grid>
                  </Grid>
                ) : (
                  !loading && !error && <Typography variant="h6" align="center">Plate not found</Typography>
                )}
              </Container>
            </Grid>
          </Grid>
        </Grid>

        {/* First row - Right Column - Nutrition Stuff */}
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <Typography>
            Lorem ipsum dolor sit amet. Est ratione rerum est enim minima eos dolorem alias qui provident incidunt et facere sunt ex incidunt iste est maxime impedit? Est quisquam distinctio aut ipsam fugit ea necessitatibus aperiam ut dolores quidem. Sit repudiandae impedit et sunt veritatis sed fuga adipisci. Id sunt architecto nam nisi praesentium in Quis voluptatem id ullam excepturi.
          </Typography>
        </Grid>

        {/* Second row */}
        <Grid item xs={12}>
          <ReviewSection />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Plate;