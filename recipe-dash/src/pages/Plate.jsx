import React, { useMemo, useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMenu, selectMenuItems, selectMenuStatus } from '../store/menuSlice';
import { addToCart } from '../store/cartSlice';
import NutritionBox from '../components/NutritionBox';
import ReviewSection from '../components/ReviewSection';

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
        id: filteredPlate.id,
        name: filteredPlate.name,
        price: filteredPlate.price,
        quantity,
        total: filteredPlate.price * quantity,
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sx={{ margin: '0', padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Container>
                <Grid container direction="column" spacing={1}>
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left' }}>
                    <img
                      src={filteredPlate.plateImage}
                      alt={`${filteredPlate.name}`}
                      style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px', display: 'block' }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
                      {filteredPlate.name}
                    </Typography>
                    <Typography variant="p" gutterBottom style={{ textAlign: 'left', fontStyle: 'italic' }}>
                      {filteredPlate.description}
                    </Typography>

                    <Box display="flex" alignItems="center" marginTop="15px">
                      <Typography variant="body2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${filteredPlate.price}
                      </Typography>

                      {filteredPlate.discount > 0 && (
                        <Box bgcolor="black" color="#DAA520" p={0.75} marginLeft="10px" borderRadius={1} sx={{ fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
                          {filteredPlate.discount}% off
                        </Box>
                      )}
                    </Box>

                    <Box marginTop="20px">
                      <TextField
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        size="small"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        sx={{ marginRight: 2 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    </Box>
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
          <ReviewSection />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Plate;

