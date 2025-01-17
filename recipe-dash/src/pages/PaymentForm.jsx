import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalPrice, selectCartItems, clearCart } from "../store/cartSlice";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = useSelector(selectCartTotalPrice);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector((state) => state.user); // Assuming customerId is in the user slice

  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/payment/create-payment-intent", {
          amount: Math.round(totalPrice * 100), // Convert to cents
          items: cartItems,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to initialize payment. Please try again.");
        console.error("Payment Intent Error:", error);
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
  
        // Submit order to the backend
        try {
          const payload = {
            customerId: user.customer_id,
            items: cartItems.map((item) => ({
              plateId: item.plate_id,
              quantity: item.quantity,
            })),
            totalPrice,
          };
  
          console.log("Submitting order payload:", payload);
          await axios.post("http://localhost:8080/deliveries/submit-order", payload);
  
          // Clear the cart state
          dispatch(clearCart());
  
          // Redirect to OrderComplete page with the total price
          navigate("/order-complete", { state: { totalPrice } });
        } catch (submitError) {
          console.error("Order Submission Error:", submitError);
          setErrorMessage("Failed to submit order. Please try again.");
        }
      } else {
        setErrorMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  
    setIsProcessing(false);
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
      }}
    >
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#DAA520" }}>
        Enter Your Payment Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" component="span" sx={{ marginRight: 2 }}>
            Order Summary
          </Typography>
          <Typography component="span">Total: ${totalPrice.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ marginBottom: 3, textAlign: "left" }}>
          <Typography variant="h6">Card Details</Typography>
          <Box
            sx={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff",
              width: "100%",
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
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>
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

        <Button type="submit" variant="contained" color="primary" disabled={!stripe || isProcessing} sx={{ marginTop: 3 }}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Container>
  );
};

export default PaymentForm;

