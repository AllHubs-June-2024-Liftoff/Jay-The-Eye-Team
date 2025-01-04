package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.models.Cuisine;
import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.repositories.CuisineRepository;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("plates")
public class PlateApi {

    @Autowired
    private PlateRepository plateRepository;

    @Autowired
    private CuisineRepository cuisineRepository;

    // Get all plates with sorting by name in ascending order
    @RequestMapping("api")
    public Iterable<Plate> sendAPIdataForPlates() {
        Sort sort = Sort.by(Sort.Order.asc("name"));
        return plateRepository.findAll(sort);
    }

    // Update an existing plate - No cuisine
    @PutMapping("api")
    public ResponseEntity<Plate> updatePlateNoCuisine(@RequestBody Map<String, Object> requestBody) {

        Optional<Plate> existingPlate = plateRepository.findById((Integer) requestBody.get("id"));

        if (existingPlate.isPresent()) {
            Plate updatedPlate = existingPlate.get();

            updatedPlate.setName((String) requestBody.get("name"));
            updatedPlate.setDescription((String) requestBody.get("description"));

            // Number fields need to be cleaned up a bit
            updatedPlate.setPrice(Float.parseFloat(((String) requestBody.get("price")).replaceAll("[^\\d.]", "")));
            updatedPlate.setDiscount(Math.round(Float.parseFloat(((String) requestBody.get("discount")).replaceAll("[^\\d.]", ""))));

            plateRepository.save(updatedPlate);
            return ResponseEntity.ok(updatedPlate);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Update an existing plate - Cuisine only
    @PutMapping("api-cuisine")
    public ResponseEntity<Plate> updatePlateCuisineOnly(@RequestBody Map<String, Object> requestBody) {

        Optional<Plate> existingPlate = plateRepository.findById((Integer) requestBody.get("id"));

        if (existingPlate.isPresent()) {
            Plate updatedPlate = existingPlate.get();
            Optional<Cuisine> selectedCuisine = cuisineRepository.findById((Integer) requestBody.get("cuisine"));

            if (selectedCuisine.isPresent()) {
                updatedPlate.setCuisine(selectedCuisine.get());

                plateRepository.save(updatedPlate);
                return ResponseEntity.ok(updatedPlate);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);  // Invalid cuisine ID
            }

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Plate not found
        }
    }

    // Delete an existing plate by ID
    @DeleteMapping("api-delete")
    public ResponseEntity<Void> deletePlate(@RequestParam("id") Integer plateId) {

        Optional<Plate> existingPlate = plateRepository.findById(plateId);

        if (existingPlate.isPresent()) {
            plateRepository.delete(existingPlate.get());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}