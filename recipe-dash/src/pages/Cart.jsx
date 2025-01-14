import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider, Box, Grid, TextField, Button, Typography, Container } from "@mui/material";
import { styled } from '@mui/system';

import {
  selectCartItems,
  selectCartTotalPrice,
  updateQuantity,
  removeFromCart,
} from "../store/cartSlice";

import logoImage from '../assets/images/reciepe-dash-black-yellow.png';
import cartEmptyImage from '../assets/images/cartempt.jpg';

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

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleCheckout = () => {
    navigate("/payment"); // Redirect to the payment page
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 1,
        margin: 0,
        height: '100vh',
        width: '100%',
        marginTop: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#DAA520',
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
          <img
            src={logoImage}
            alt="Logo"
            style={{
              width: "250px",
              display: "block",
              marginTop: "30px",
            }}
          />
        </Grid>
      ) : (
        <>
          <Grid container spacing={2} sx={{ padding: 1 }}>
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
              <StyledHeaderTypography>Price</StyledHeaderTypography>
            </Grid>
            <Grid item xs={2}>
              <StyledHeaderTypography>Total</StyledHeaderTypography>
            </Grid>
            <Grid item xs={1}>
              <StyledHeaderTypography> </StyledHeaderTypography>
            </Grid>
          </Grid>

          {cartItems.map((item) => (
            <Grid container spacing={2} key={item.id} alignItems="center">
              <Grid item xs={2}>
                <img
                  src={item.plateImage}
                  alt={item.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography>${item.price.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemove(item.id)}
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
            width: '100%',
            borderStyle: 'solid',
            opacity: 1,
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