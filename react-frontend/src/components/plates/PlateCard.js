import React from 'react';
import { Box, Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';

const PlateCard = ({ plate }) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea component="a" href={`/plate/${plate.id}`} target="_blank">
        <CardMedia
          component="img"
          height="150"
          image={plate.plateImage}
          alt={plate.name || 'Plate Image'}
        />
        <CardContent>
          <Typography variant="body1" style={{  fontSize: '1.1rem', fontWeight: 'bold' }}>
            {plate.name || 'No plate name'}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="5px">
            <Box display="flex" alignItems="center">
              {plate.discount > 0 && (
                <Box
                  bgcolor="black"
                  color="#DAA520"
                  p={0.5}
                  borderRadius={1}
                  display="flex"
                  alignItems="center"
                  sx={{ fontSize: '0.7rem', textAlign: 'center', fontWeight: 'bold' }}
                >
                  -{plate.discount}%
                </Box>
              )}
            </Box>
            <Typography variant="body2" color="text.primary" textAlign="right"
            sx={{ fontSize: '0.95rem' }} >
              ${plate.price}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlateCard;