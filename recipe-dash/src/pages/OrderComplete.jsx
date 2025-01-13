import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../store/cartSlice";
import { Container, Typography, Box } from "@mui/material";

const OrderComplete = () => {
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <Container
      sx={{
        marginTop: 5,
        maxWidth: "500px",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Thank You for Your Order!
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Your total price is <strong>${totalPrice.toFixed(2)}</strong>.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        The chef will be getting started on your order, and it will be on the way shortly.
      </Typography>
    </Container>
  );
};

export default OrderComplete;
