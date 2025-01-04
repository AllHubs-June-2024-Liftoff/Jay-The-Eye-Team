package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;


@Entity
public class Review {

//    database columns:
//    id
//    plate_id
//    review_text
//    review_stars
//    date

    // RELATIONAL
    @ManyToOne
    @JoinColumn(name = "plate", nullable = false)
    @JsonManagedReference // Prevent recursion in api data
    private Plate plate;

    // INDEPENDENT
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime dateCreated;

    @NotNull(message = "⚠️ Field cannot be empty")
    private Double rating;

    @NotEmpty(message = "⚠️ Field cannot be empty")
    @Size(min = 1, max = 1000, message = "Text length is out of bounds")
    @Column(columnDefinition = "TEXT")
    private String description;

    public Review() {}

    public Review(Double rating, String description, LocalDateTime dateCreated, Plate plate) {
        this.rating = rating;
        this.description = description;
        this.dateCreated = dateCreated;
        this.plate = plate;
    }

    // Getter and Setter methods
    public int getId() {
        return id;
    }

    public LocalDateTime getDateCreated() { return dateCreated; }
    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public  Double getRating() {
        return rating;
    }
    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Plate getPlate() { return plate; }
    public void setPlate(Plate plate) { this.plate = plate; }

    // Custom getter for Plate to only return its name in JSON
    @JsonGetter("plate")
    public String getPlateName() {
        return this.plate != null ? this.plate.getName() : null;
    }

}