import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Link, Box, Avatar, Card, CircularProgress } from '@mui/material';
import { fetchFavoritePlates, selectFavoritePlates } from '../store/favoritesSlice';
import { selectMenuItems } from '../store/menuSlice';
import { login } from "../store/userSlice";
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
}));

const FavoritesList = () => {
  const dispatch = useDispatch();

  // Check if user data exists in localStorage on initial load
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  const favoritePlateIds = useSelector(selectFavoritePlates);
  const plates = useSelector(selectMenuItems);

  // Use a state to track if favorites are already fetched
  const isFavoritesFetched = useSelector((state) => state.favorites.isFavoritesFetched);

  // Loading state to show the spinner while data is being fetched
  const [isLoading, setIsLoading] = useState(true);

  // Fetch favorites only if not already fetched and if user is available
  useEffect(() => {
    if (storedUserData?.customer_id && !isFavoritesFetched) {
      dispatch(fetchFavoritePlates(storedUserData.customer_id));
    }
  }, [storedUserData, isFavoritesFetched, dispatch]);

  // Once the favorites have been fetched, stop the loading spinner
  useEffect(() => {
    if (isFavoritesFetched) {
      setIsLoading(false);
    }
  }, [isFavoritesFetched]);

  // Filter plates by favorite IDs
  const favoritePlates = plates.filter((plate) => favoritePlateIds.includes(plate.id));

  return (
    <Box>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : !favoritePlates.length ? (
        <StyledCard
          style={{
            backgroundColor: 'white',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1">♥️ You don't have any favorites yet</Typography>
        </StyledCard>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            margin: 'auto',
            maxHeight: 150,
            overflowX: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 2, // space between images
            padding: 2,
          }}
        >
          {favoritePlates.map((plate) => (
            <Link
              key={plate.id}
              component={RouterLink}
              to={`/plate/${plate.id}`}
              underline="hover"
              color="primary"
            >
              <Avatar
                src={plate.plateImage}
                alt={plate.name}
                variant="square"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              />
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FavoritesList;