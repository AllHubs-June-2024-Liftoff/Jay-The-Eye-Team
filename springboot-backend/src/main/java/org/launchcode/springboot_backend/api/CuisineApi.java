package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.models.Cuisine;
import org.launchcode.springboot_backend.repositories.CuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("cuisines")
public class CuisineApi {

    @Autowired
    private CuisineRepository cuisineRepository;

    // Get all cuisines with sorting by name in ascending order
    @GetMapping("api")
    public ResponseEntity<Iterable<Cuisine>> getAllCuisines() {
        Iterable<Cuisine> cuisines = cuisineRepository.findAll(Sort.by(Sort.Order.asc("name")));
        return ResponseEntity.ok(cuisines);
    }

    // Update an existing cuisine
    @PutMapping("api")
    public ResponseEntity<Cuisine> updateCuisine(@RequestBody Map<String, Object> requestBody) {

        Optional<Cuisine> existingCuisine = cuisineRepository.findById((Integer) requestBody.get("id"));

        if (existingCuisine.isPresent()) {
            Cuisine updatedCuisine = existingCuisine.get();

            updatedCuisine.setName((String) requestBody.get("name"));
            updatedCuisine.setDescription((String) requestBody.get("description"));

            cuisineRepository.save(updatedCuisine);
            return ResponseEntity.ok(updatedCuisine);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}