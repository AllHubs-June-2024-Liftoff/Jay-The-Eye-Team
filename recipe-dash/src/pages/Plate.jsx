import React, { useMemo, useEffect, useState } from 'react';
import { Divider, Box, Container, Typography, Grid, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMenu, selectMenuItems, selectMenuStatus } from '../store/menuSlice';
import { addToCart } from '../store/cartSlice';
import NutritionBox from '../components/NutritionBox';
import ReviewList from '../components/reviews/ReviewList';
import ReviewAddByCustomer from '../components/reviews/ReviewAddByCustomer';

const dividerGoldStyle = {
    marginTop: 2,
    marginBottom: 2,
    borderWidth: 3,
    borderColor: '#DAA520',
    width: '100%',
};

const Plate = () => {
  const { plateId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plates = useSelector(selectMenuItems);
  const menuStatus = useSelector(selectMenuStatus);
  const [quantity, setQuantity] = useState(1);

  // Fetch menu if not already loaded
  useEffect(() => {
    if (menuStatus === 'idle') {
      dispatch(fetchMenu());
    }
  }, [menuStatus, dispatch]);

  // Find the plate by ID
  const filteredPlate = useMemo(
    () => plates.find((plate) => plate.id === Number(plateId)),
    [plates, plateId]
  );

  const handleAddToCart = () => {
    if (filteredPlate && quantity > 0) {
      dispatch(addToCart({
        plate_id: filteredPlate.id, // Use plate_id instead of id
        name: filteredPlate.name,
        price: filteredPlate.price,
        quantity,
        total: filteredPlate.price * quantity,
        plateImage: filteredPlate.imageUrl,
      }));
  
      navigate('/');
    }
  };

  if (menuStatus === 'loading') {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (!filteredPlate) {
    return <Typography variant="h6" align="center">Plate not found</Typography>;
  }

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={1} alignItems="top">
        <Grid item xs={6} sx={{ margin: '0', padding: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Container>
                  <Divider sx={dividerGoldStyle} />
                    <Grid container direction="column" spacing={1}>
                      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', marginTop: '20px' }}>
                        <img
                          src={filteredPlate.plateImage}
                          alt={`${filteredPlate.name}`}
                          style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '10px', display: 'block' }}
                        />
                      </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h4" component="div" gutterBottom style={{ textAlign: 'left' }}>
                      {filteredPlate.name}
                    </Typography>
                    <Typography variant="p" component="div" gutterBottom style={{ marginTop: '1px', textAlign: 'left', fontStyle: 'italic' }}>
                      {filteredPlate.description}
                    </Typography>

                    <Box display="flex" alignItems="center" marginTop="15px">
                      <Typography variant="body2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${filteredPlate.price}
                      </Typography>

                      {filteredPlate.discount > 0 && (
                        <Box color="#DAA520" p={0.75} marginLeft="15px" borderRadius={1} sx={{ fontSize: '1rem',
                            textAlign: 'center'}}>
                          Order today and get {filteredPlate.discount}% off!
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', marginTop: '50px', justifyContent: 'right' }} >
                          <TextField
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            size="small"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                            sx={{ marginRight: 3, width: '75px', '& .MuiInputBase-input': { textAlign: 'center' } }}
                          />
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: 'black', marginBottom: '20px' }}
                            onClick={handleAddToCart}
                          >
                            Add to Cart
                          </Button>
                    </Box>
                    <Divider sx={dividerGoldStyle} />
                    <Grid item xs={12}>
                      <ReviewAddByCustomer />
                    </Grid>

                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <NutritionBox plates={plates} />
        </Grid>

        <Grid item xs={12}>
          <ReviewList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Plate;

