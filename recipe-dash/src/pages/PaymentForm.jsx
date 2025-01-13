import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotalPrice, selectCartItems } from "../store/cartSlice";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = useSelector(selectCartTotalPrice);
  const cartItems = useSelector(selectCartItems);

  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/payment/create-payment-intent", {
          amount: Math.round(totalPrice * 100),
          items: cartItems,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to initialize payment. Please try again.");
      }
    };

    fetchPaymentIntent();
  }, [totalPrice, cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsProcessing(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccessMessage("Payment successful! Thank you for your order.");
      } else {
        setErrorMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <Container sx={{ marginTop: 5, maxWidth: "500px" }}>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Order Summary</Typography>
          <Typography>Total: ${totalPrice.toFixed(2)}</Typography>
        </Box>

        <Box
  sx={{
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginBottom: "20px",
    width: "100%", // Ensure it takes up available space
    maxWidth: "500px", // Optional: limit the width
  }}
>
  <CardElement
    options={{
      style: {
        base: {
          fontSize: "16px",
          color: "#424770",
          "::placeholder": {
            color: "#aab7c4",
          },
          padding: "12px",
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }}
  />
</Box>


        {errorMessage && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography color="success" sx={{ marginTop: 2 }}>
            {successMessage}
          </Typography>
        )}

        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PaymentForm;

