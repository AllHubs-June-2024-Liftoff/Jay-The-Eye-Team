import React, { useEffect } from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu, selectMenuItems, selectMenuStatus } from '../../store/menuSlice';
import PlateCard from './PlateCard';

const PlateList = () => {
  const dispatch = useDispatch();
  const plates = useSelector(selectMenuItems);
  const status = useSelector(selectMenuStatus);

  // Fetch menu items on load
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenu());
    }
  }, [status, dispatch]);

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
        Failed to load menu. Please try again later.
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {plates.map((plate) => (
        <Grid item key={plate.id} xs={12} sm={6} md={4}>
          <Link to={`/plate/${plate.id}`} style={{ textDecoration: 'none' }}>
            <PlateCard plate={plate} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlateList;


