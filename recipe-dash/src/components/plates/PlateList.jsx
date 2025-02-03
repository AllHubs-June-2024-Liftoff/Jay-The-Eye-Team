import React from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PlateCard from './PlateCard';

const PlateList = ({ plates, status }) => {

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <CircularProgress size={100} sx={{ color: '#DAA520' }} />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ color: '#DAA520', textAlign: 'center', marginTop: '20px' }}>
        Failed to load menu. Please try again later!
      </Box>
    );
  }

  if (!plates.length) {
    return (
      <Box sx={{ color: '#DAA520', textAlign: 'center', marginTop: '20px' }}>
        No plates found.
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {plates.map((plate) => (
        <Grid item key={plate.id} xs={6} sm={3} md={3}>
          <PlateCard plate={plate} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PlateList;
