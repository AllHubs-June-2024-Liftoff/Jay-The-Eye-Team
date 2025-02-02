import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Link, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { fetchFavoritePlates, selectFavoritePlates } from '../store/favoritesSlice';
import { selectMenuItems } from '../store/menuSlice';
import { Link as RouterLink } from 'react-router-dom';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favoritePlateIds = useSelector(selectFavoritePlates);
  const plates = useSelector(selectMenuItems);

  // Fetch favorites if not already loaded
  useEffect(() => {
    if (user?.customer_id) {
      dispatch(fetchFavoritePlates(user.customer_id));
    }
  }, [user, dispatch]);

  // Filter plates by favorite IDs
  const favoritePlates = plates.filter((plate) => favoritePlateIds.includes(plate.id));

  if (!favoritePlates.length) {
    return <Typography variant="body1">No favorites found.</Typography>;
  }

  return (
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
  );


};

export default FavoritesList;