import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider, Box, Grid, TextField, Button, Typography, Container } from "@mui/material";
import { styled } from '@mui/system';
import axios from "axios";

import {
  selectCartItems,
  selectCartTotalPrice,
  updateQuantity,
  removeFromCart,
} from "../store/cartSlice";

import cartEmptyImage from '../assets/images/cartempt.jpg';
import defaultPlaceholder from '../assets/images/default-placeholder.jpg';

const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  alignItems: 'left',
}));

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleQuantityChange = (plate_id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ plate_id, quantity }));
    }
  };

  const handleRemove = (plate_id) => {
    dispatch(removeFromCart({ plate_id }));
  };

  const handleCheckout = () => {
    navigate("/payment"); // Redirect to the payment page
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 1,
        margin: 0,
        height: '100vh',
        width: '100%',
        marginTop: 4,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#DAA520',
          marginBottom: 4,
        }}
      >
        Review Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Grid sx={{
          justifyContent: 'center',
          marginTop: 1,
        }}>
          <img
            src={cartEmptyImage}
            alt="Empty Cart"
            style={{
              width: "250px",
              display: "block",
            }}
          />
          <Typography variant="h5" align="center">
            Your cart is empty!
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid container spacing={3} sx={{ padding: 1, alignItems: 'center'}}>
            <Grid item xs={2}>
              <StyledHeaderTypography> </StyledHeaderTypography>
            </Grid>
            <Grid item xs={3}>
              <StyledHeaderTypography>Name</StyledHeaderTypography>
            </Grid>
            <Grid item xs={2}>
              <StyledHeaderTypography>Quantity</StyledHeaderTypography>
            </Grid>
            <Grid item xs={2}>
              <StyledHeaderTypography>Unit Price</StyledHeaderTypography>
            </Grid>
            <Grid item xs={2}>
              <StyledHeaderTypography>Total</StyledHeaderTypography>
            </Grid>
            <Grid item xs={1}>
              <StyledHeaderTypography></StyledHeaderTypography>
            </Grid>
          </Grid>

          {cartItems.map((item) => (

            <Grid container spacing={2} key={item.plate_id} alignItems="center" marginBottom="10px">
              <Grid item xs={2}>
                <img
                  src={item.plateImage || defaultPlaceholder}
                  alt={item.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "20%",
                  }}
                  onError={(e) => { e.target.src = defaultPlaceholder; }}
                />
              </Grid>

                <Grid item xs={3}>
                      <Typography align="left">{item.name}</Typography>
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.plate_id, Number(e.target.value))}
                    InputProps={{
                      style: {
                        textAlign: 'center',
                      },
                    }}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                      },
                    }}
                  />
                </Grid>

              <Grid item xs={2}>
                <Typography>${item.price.toFixed(2)}</Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Typography>
              </Grid>

              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemove(item.plate_id)}
                  sx={{
                    backgroundColor: 'black',
                    '&:hover': {
                      backgroundColor: '#DAA520',
                    },
                    fontSize: '0.65rem',
                  }}
                  size="medium"
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </Button>
              </Grid>

            </Grid>
          ))}

          <Divider sx={{
            marginTop: 4,
            borderWidth: 3,
            borderColor: 'black',
            width: '100vh',
            borderStyle: 'solid',
            opacity: 1,
            alignItems: 'center',
          }} />

          <Grid container justifyContent="flex-end" sx={{ marginTop: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Grand Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{
                marginTop: 3,
                backgroundColor: "#DAA520",
                "&:hover": {
                  backgroundColor: "black",
                },
                fontWeight: 'bold',
                width: "200px",
              }}
              size="large"
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
