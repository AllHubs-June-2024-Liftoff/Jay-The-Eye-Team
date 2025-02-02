import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalPrice, selectCartItems, clearCart } from "../store/cartSlice";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import creditCardImage from '../assets/images/Credit-Card-Icon.png';

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

    if (totalPrice > 0) {
      fetchPaymentIntent();
    }
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
  
    if (!user?.customer_id) {
      setErrorMessage("Customer ID is missing. Please log in again.");
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
        setIsProcessing(false);
        return;
      }
  
      if (paymentIntent.status === "succeeded") {
        setSuccessMessage("Payment successful! Thank you for your order.");
  
        const payload = {
          customer_id: user.customer_id,  // Ensure correct key
          items: cartItems.map((item) => ({
            plateId: item.plate_id,
            quantity: item.quantity,
          })),
          totalPrice: parseFloat(totalPrice.toFixed(2)),
        };
  
        console.log("Submitting order payload:", payload);
  
        // Ensure customer ID exists in payload before submission
        if (!payload.customer_id) {
          throw new Error("Customer ID is missing in request payload.");
        }
  
        await axios.post("http://localhost:8080/deliveries/submit-order", payload);
  
        dispatch(clearCart());
        navigate("/order-complete", { state: { totalPrice } });
      } else {
        setErrorMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Order Submission Error:", error);
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
        width: "750px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" align="center"
        gutterBottom sx={{ fontWeight: "bold", color: "#DAA520", marginBottom: 1 }}>
        Enter Your Payment Details Below
      </Typography>
      <img
         src={creditCardImage}
         alt="creditCardImage"
         style={{
           width: "35%",
           display: "block",
           marginBottom: "50px",
         }}
       />

      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h4" component="span"> Cart Total:</Typography>
          <Typography component="span" variant="h4" fontWeight="bold"> ${totalPrice.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ marginBottom: 3, textAlign: "left" }}>
          <Box
            sx={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff",
              width: "600px",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "20px",
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

        <Button type="submit" variant="contained" color="primary" disabled={!stripe || isProcessing}
            sx={{ marginTop: 3,
                backgroundColor: "#DAA520",
                  "&:hover": {
                    backgroundColor: "black",
                  },
              }}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Container>
  );
};

export default PaymentForm;
