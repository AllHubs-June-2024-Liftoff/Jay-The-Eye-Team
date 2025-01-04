import React, { useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import PlateApi from './PlateApi';
import PlateCard from './PlateCard';

const PlateList = () => {
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function will be called by PlateApi when data is fetched
  const fetchPlates = (data) => {
    setPlates(data);
    setLoading(false);  // Set loading to false once data is received
  };

  return (
    <div>
      <PlateApi onFetchPlates={fetchPlates} />  {/* Fetch data from the API */}

      {loading && !error ? (
        <CircularProgress size={70} color="#C05746" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Grid container spacing={4}>
          {plates.map((plate) => (
            <Grid item key={plate.id} xs={6} sm={3} md={3}>
              <PlateCard plate={plate} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PlateList;
