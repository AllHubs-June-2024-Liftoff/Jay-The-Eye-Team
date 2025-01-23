package org.launchcode.springboot_backend.api;

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
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/deliveries")
public class DeliveryApi {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PlateRepository plateRepository;

    public DeliveryApi() {}

    @GetMapping("/api")
    public Iterable<Delivery> getDeliveryData() {
        Sort sort = Sort.by(Sort.Order.desc("id"));
        return deliveryRepository.findAll(sort);
    }

    @PostMapping("/submit-order")
    public ResponseEntity<?> submitOrder(@RequestBody Map<String, Object> orderData) {
        try {
            System.out.println("Received order data: " + orderData);

            Object customerIdObj = orderData.get("customer_id");
            if (customerIdObj == null) {
                return ResponseEntity.badRequest().body("Customer ID is missing or null");
            }
            int customerId;
            try {
                customerId = Integer.parseInt(customerIdObj.toString());
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("Invalid customer ID format");
            }

            Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
            if (optionalCustomer.isEmpty()) {
                return ResponseEntity.status(404).body("Customer not found");
            }

            Customer customer = optionalCustomer.get();
            Delivery delivery = new Delivery();
            delivery.setCustomer(customer);
            delivery.setDateCreated(LocalDateTime.now());
            delivery.setStatus(Delivery.Status.NEW);

            List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");

            // Create a map to store plate quantities
            Map<Plate, Integer> plateQuantities = new HashMap<>();
            List<Plate> plates = fetchPlatesFromItems(items, plateQuantities);

            delivery.setPlates(plates);
            delivery.setPlateQuantities(plateQuantities);

            double totalPrice = Double.parseDouble(orderData.get("totalPrice").toString());
            delivery.setGrandTotal(totalPrice);

            deliveryRepository.save(delivery);

            return ResponseEntity.ok("Order submitted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit order");
        }
    }

    private List<Plate> fetchPlatesFromItems(List<Map<String, Object>> items, Map<Plate, Integer> plateQuantities) {
        return items.stream()
                .map(item -> {
                    int plateId = (int) item.get("plateId");
                    int quantity = (int) item.get("quantity"); // Get quantity from request
                    Plate plate = plateRepository.findById(plateId)
                            .orElseThrow(() -> new RuntimeException("Plate not found for ID: " + plateId));

                    // Store the plate and its quantity in the map
                    plateQuantities.put(plate, quantity);
                    return plate;
                })
                .collect(Collectors.toList());
    }

    @PutMapping("/api-status")
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/order-history/{customer_id}")
    public ResponseEntity<?> getOrderHistory(@PathVariable("customer_id") int customerId) {
        List<Delivery> deliveries = deliveryRepository.findByCustomerId(customerId);
        if (deliveries.isEmpty()) {
            return ResponseEntity.status(404).body("No orders found for this customer");
        }

        // Map deliveries to include detailed plate and quantity information
        List<Map<String, Object>> orderHistory = deliveries.stream().map(delivery -> {
            Map<String, Object> orderDetails = new HashMap<>();
            orderDetails.put("id", delivery.getId());
            orderDetails.put("dateCreated", delivery.getDateCreated());
            orderDetails.put("status", delivery.getStatus());
            orderDetails.put("grandTotal", delivery.getGrandTotal());

            // Map plates and quantities
            List<Map<String, Object>> items = delivery.getPlateQuantities().entrySet().stream().map(entry -> {
                Plate plate = entry.getKey();
                int quantity = entry.getValue();
                Map<String, Object> itemDetails = new HashMap<>();
                itemDetails.put("plateId", plate.getId());
                itemDetails.put("plateName", plate.getName());
                itemDetails.put("price", plate.getPrice());
                itemDetails.put("quantity", quantity);
                return itemDetails;
            }).collect(Collectors.toList());

            orderDetails.put("items", items);
            return orderDetails;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(deliveries);
    }
}