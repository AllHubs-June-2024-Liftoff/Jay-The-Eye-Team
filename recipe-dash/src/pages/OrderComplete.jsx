import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Container, Box, Button } from "@mui/material";

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice || 0; // Fallback to 0 if state is undefined

  const handleRedirect = () => {
    navigate("/"); // Use navigate instead of window.location.href to avoid a full page reload
  };

  return (
    <Container
      sx={{
        padding: 4,
        border: "1px solid #DAA520",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        maxWidth: "600px",
        marginTop: 5,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#DAA520" }}>
        Thank You for Your Order!
      </Typography>
      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <Typography variant="h6">Your Total: ${totalPrice.toFixed(2)}</Typography>
        <Typography>
          The chef will begin preparing your order, and it will be on the way shortly.
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Return to Home
      </Button>
    </Container>
  );
};

export default OrderComplete;
