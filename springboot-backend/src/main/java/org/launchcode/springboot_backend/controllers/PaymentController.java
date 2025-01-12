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

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> paymentInfo) {
        try {
            Stripe.apiKey = stripeSecretKey;

            // Validate the amount field
            if (!paymentInfo.containsKey("amount") || !(paymentInfo.get("amount") instanceof Number)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid or missing amount"));
            }

            long amount = ((Number) paymentInfo.get("amount")).longValue();

            if (amount <= 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "Amount must be greater than zero"));
            }

            // Allow dynamic currency if provided
            String currency = paymentInfo.getOrDefault("currency", "usd").toString();

            // Create payment intent parameters
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", currency);
            params.put("payment_method_types", new String[]{"card"});

            // Create PaymentIntent
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Respond with clientSecret
            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(responseData);

        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Payment processing failed. Please try again."));
        }
    }
}

