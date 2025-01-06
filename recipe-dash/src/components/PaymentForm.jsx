import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // Get payment intent from backend
        const { data } = await axios.post("http://localhost:8080/api/payment/create-payment-intent", {
            amount: 5000, // Example: $50.00
        });

        // Confirm the payment
        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setSuccessMessage("Payment successful!");
        }
    };

    return (
        <div>
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
        </div>
    );
};

export default PaymentForm;
