package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.models.Delivery;
import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.launchcode.springboot_backend.repositories.DeliveryRepository;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PlateRepository plateRepository;

    @PostMapping("/submit-order")
    public ResponseEntity<?> submitOrder(@RequestBody Map<String, Object> orderData) {
        try {
            System.out.println("Received orderData: " + orderData);

            Integer customerId = (Integer) orderData.get("customerId");
            List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");

            if (customerId == null) {
                return ResponseEntity.badRequest().body("Customer ID is required.");
            }

            if (items == null || items.isEmpty()) {
                return ResponseEntity.badRequest().body("Items cannot be empty.");
            }

            Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
            if (optionalCustomer.isEmpty()) {
                return ResponseEntity.status(404).body("Customer not found.");
            }

            Customer customer = optionalCustomer.get();

            Delivery delivery = new Delivery();
            delivery.setCustomer(customer);
            delivery.setDateCreated(LocalDateTime.now());
            delivery.setStatus(Delivery.Status.NEW);

            List<Plate> plates = items.stream()
                    .map(item -> {
                        Integer plateId = (Integer) item.get("plateId");
                        return plateRepository.findById(plateId)
                                .orElseThrow(() -> new RuntimeException("Plate not found for ID: " + plateId));
                    })
                    .collect(Collectors.toList());
            delivery.setPlates(plates);

            deliveryRepository.save(delivery);
            return ResponseEntity.ok("Order submitted successfully.");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Invalid data: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit order.");
        }
    }
}




