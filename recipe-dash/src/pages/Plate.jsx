import React, { useMemo, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMenu, selectMenuItems, selectMenuStatus } from '../store/menuSlice';
import { addToCart } from '../store/cartSlice';
import NutritionBox from '../components/NutritionBox';


const Plate = () => {
  const { plateId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

        <Grid item xs={6} sx={{ margin: '0', padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Container>

                      {filteredPlate.description}
                    </Typography>

                    <Box display="flex" alignItems="center" marginTop="15px">
                      <Typography variant="body2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${filteredPlate.price}
                      </Typography>

                      {filteredPlate.discount > 0 && (

                        </Box>
                      )}
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
          <ReviewList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Plate;

