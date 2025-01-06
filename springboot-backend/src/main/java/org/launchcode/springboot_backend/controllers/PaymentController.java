package org.launchcode.springboot_backend.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    // Inject the Stripe Secret Key from application.properties
    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> paymentInfo) {
        try {
            // Initialize Stripe with the secret key
            Stripe.apiKey = stripeSecretKey;

            // Create payment intent parameters
            Map<String, Object> params = new HashMap<>();
            params.put("amount", paymentInfo.get("amount")); // Amount in cents
            params.put("currency", "usd");
            params.put("payment_method_types", new String[]{"card"});

            // Create PaymentIntent
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Send client_secret to frontend
            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(responseData);
        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}

