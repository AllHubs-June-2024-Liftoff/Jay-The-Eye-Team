package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.models.Favorite;
import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.launchcode.springboot_backend.repositories.FavoriteRepository;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PlateRepository plateRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addFavorite(@RequestBody Map<String, Integer> payload) {
        int customerId = payload.get("customer_id");
        int plateId = payload.get("plate_id");

        Optional<Customer> customerOpt = customerRepository.findById(customerId);
        Optional<Plate> plateOpt = plateRepository.findById(plateId);

        if (customerOpt.isEmpty() || plateOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer or Plate not found");
        }

        Favorite favorite = new Favorite(customerOpt.get(), plateOpt.get());
        favoriteRepository.save(favorite);

        return ResponseEntity.ok("Favorite added successfully");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFavorite(@RequestParam int customerId, @RequestParam int plateId) {
        Optional<Favorite> favorite = favoriteRepository.findByCustomerIdAndPlatesId(customerId, plateId);

        if (favorite.isPresent()) {
            favoriteRepository.delete(favorite.get());
            return ResponseEntity.ok("Favorite removed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorite not found");
        }
    }
}

