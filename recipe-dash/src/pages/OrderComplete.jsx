import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Container, Box, Button } from "@mui/material";
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice || 0; // Fallback to 0 if state is undefined

  const handleRedirect = () => {
    navigate("/account"); // Use navigate instead of window.location.href to avoid a full page reload
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "750px",
      }}
    >
     <img
       src={logoImage}
       alt="Logo"
       style={{
         width: "35%",
         display: "block",
         margin: "10px auto",
       }}
     />

      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#DAA520" }}>
        Thank you for your order!
      </Typography>
      <Box sx={{marginBottom: 7 }}>
        <Typography>
          The chef will begin preparing your order, and it will be on the way shortly.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        sx={{
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "#DAA520",
          },
            width: "50%",
            margin: "1px auto",
            textTransform: "none",
            fontSize: "18px",
        }}
      >
        See order details in accounts page
      </Button>
    </Container>
  );
};

export default OrderComplete;