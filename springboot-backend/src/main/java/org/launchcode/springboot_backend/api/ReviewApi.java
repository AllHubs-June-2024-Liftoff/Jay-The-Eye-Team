package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.models.Review;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.launchcode.springboot_backend.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("reviews")
public class ReviewApi {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PlateRepository plateRepository;

    @GetMapping("api")
    public Iterable<Review> getReviewsData() {
        Sort sort = Sort.by(Sort.Order.asc("id"));
        return reviewRepository.findAll(sort);
    }

    @GetMapping("plate/{plateId}")
    public Iterable<Review> getReviewDataByPlate(@PathVariable Integer plateId) {
        return reviewRepository.findByPlateId(plateId);
    }

    @PostMapping("api-update")
    public ResponseEntity<Review> createNewReview(@RequestBody Map<String, Object> requestBody) {

        try {
            // Extract and convert the data with null checks
            Double rating = Double.valueOf((String) requestBody.get("rating"));
            String description = (String) requestBody.get("description");
            Integer plateId = Integer.valueOf((String) requestBody.get("plateId"));

            // Parse the date string into LocalDateTime
            String dateCreatedStr = (String) requestBody.get("date");
            LocalDateTime dateCreated = LocalDateTime.parse(dateCreatedStr);

            // Find plate by ID
            Optional<Plate> existingPlate = plateRepository.findById(plateId);
            if (existingPlate.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
            Plate plate = existingPlate.get();

            // Create and save the new review to the repo
            Review newReview = new Review(rating, description, dateCreated, plate);
            reviewRepository.save(newReview);
            return ResponseEntity.ok(newReview);

        } catch (Exception e) {
            // Log the error and return an internal server error
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}