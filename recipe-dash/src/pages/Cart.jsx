import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems, selectCartTotalPrice, updateQuantity, removeFromCart } from "../store/cartSlice";
import { Grid, TextField, Button, Typography, Container } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();

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


  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
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
          </Grid>

        </>
      )}
    </Container>
  );
};

export default Cart;
