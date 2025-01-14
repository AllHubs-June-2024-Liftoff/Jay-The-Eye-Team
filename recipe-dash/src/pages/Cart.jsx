import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotalPrice, updateQuantity, removeFromCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalPrice,
  updateQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { Grid, TextField, Button, Typography, Container } from "@mui/material";

import logoImage from '../assets/images/reciepe-dash-black-yellow.png';
import cartEmptyImage from '../assets/images/cartempt.jpg';

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
       marginTop:4,
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
          <Grid>
            {cartItems.map((item) => (
              <Grid container spacing={2} key={item.id} alignItems="center">
                <Grid item xs={12} sm={2}>
                  <img
                    src={item.plateImage}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography>{item.name}</Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Math.max(1, Number(e.target.value)))}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography>${item.price.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemove(item.id)}
                    sx={{
                      backgroundColor: '#DAA520',
                      '&:hover': {
                        backgroundColor: 'black',
                      },
                    }}
                    size="medium"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </Button>
                </Grid>
          <Grid container spacing={2} sx={{ marginBottom: 4 }}>
            <Grid item xs={2}>
              <Typography variant="h6">Image</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Quantity</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Price</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Total</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6">Action</Typography>
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
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}

          <Typography variant="h5" align="right" sx={{ marginTop: 4 }}>
            Grand Total: ${totalPrice.toFixed(2)}
          </Typography>

          <Grid container justifyContent="flex-end" sx={{ marginTop: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            sx={{ marginTop: 2, float: "right" }}
          >
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
