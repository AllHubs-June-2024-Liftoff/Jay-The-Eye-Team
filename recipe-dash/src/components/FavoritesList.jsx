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
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
      <List>
        {favoritePlates.map((plate) => (
          <ListItem key={plate.id} sx={{ borderBottom: '1px solid #ddd', paddingY: 2 }}>
            <ListItemAvatar>
              <Avatar
                src={plate.plateImage}
                alt={plate.name}
                variant="square"
                sx={{ width: 60, height: 60, borderRadius: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: 2 }}>
                  <Link
                    component={RouterLink}
                    to={`/plate/${plate.id}`}
                    underline="hover"
                    color="primary"
                    variant="h6"
                  >
                    {plate.name}
                  </Link>
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                    ${plate.price.toFixed(2)}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FavoritesList;
