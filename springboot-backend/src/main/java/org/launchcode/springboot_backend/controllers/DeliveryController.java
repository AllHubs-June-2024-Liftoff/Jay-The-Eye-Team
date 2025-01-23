package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Delivery;
import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.repositories.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @GetMapping("list-deliveries")
    public String listAllDeliveries(Model model) {
        Sort sort = Sort.by(Sort.Order.asc("dateCreated"));
        model.addAttribute("deliveries", deliveryRepository.findAll(sort));
        model.addAttribute("statusOptions", Delivery.Status.values());
        return "deliveries/list-deliveries";
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


