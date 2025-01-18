package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.models.Cuisine;
import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.models.Delivery;
import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.launchcode.springboot_backend.repositories.DeliveryRepository;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("deliveries")
public class DeliveryApi {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PlateRepository plateRepository;

    public DeliveryApi() {
    }

    @GetMapping("api")
    public Iterable<Delivery> geDeliveryData() {
        Sort sort = Sort.by(Sort.Order.asc("dateCreated"));
        return deliveryRepository.findAll(sort);
    }

    @PostMapping("/submit-order")
    public ResponseEntity<?> submitOrder(@RequestBody Map<String, Object> orderData) {
        try {
            // Extract customerId and items from the request payload
            int customerId = (int) orderData.get("customerId");
            List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");

            // Validate customer existence
            Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
            if (optionalCustomer.isEmpty()) {
                return ResponseEntity.status(404).body("Customer not found");
            }

            Customer customer = optionalCustomer.get();

            // Create new Delivery object
            Delivery delivery = new Delivery();
            delivery.setCustomer(customer);
            delivery.setDateCreated(LocalDateTime.now());
            delivery.setStatus(Delivery.Status.NEW);

            // Add plates to the delivery
            List<Plate> plates = fetchPlatesFromItems(items);
            delivery.setPlates(plates);

            // Save the delivery
            deliveryRepository.save(delivery);

            return ResponseEntity.ok("Order submitted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit order");
        }
    }

    private List<Plate> fetchPlatesFromItems(List<Map<String, Object>> items) {
        // Fetch Plate objects based on plateId in the items
        return items.stream()
                .map(item -> {
                    int plateId = (int) item.get("plateId");
                    return plateRepository.findById(plateId)
                            .orElseThrow(() -> new RuntimeException("Plate not found for ID: " + plateId));
                })
                .collect(Collectors.toList());
    }

    // Update an existing delivery - Status only
    @PutMapping("api-status")
    public ResponseEntity<Delivery> updateDeliveryStatusOnly(@RequestBody Map<String, Object> requestBody) {

        Optional<Delivery> existingDelivery = deliveryRepository.findById((Integer) requestBody.get("id"));

        if (existingDelivery.isPresent()) {
            Delivery updatedDelivery = existingDelivery.get();

            String statusString = (String) requestBody.get("status");
            Delivery.Status updatedStatus = Delivery.Status.valueOf(statusString);
            updatedDelivery.setStatus(updatedStatus);

            deliveryRepository.save(updatedDelivery);
            return ResponseEntity.ok(updatedDelivery);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Plate not found
        }
    }
}


