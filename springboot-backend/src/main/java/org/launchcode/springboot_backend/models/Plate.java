package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Plate extends AbstractEntity {

    // RELATIONAL MAPPINGS
    @ManyToOne
    @JoinColumn(name = "cuisine", nullable = false)
    private Cuisine cuisine;

    @OneToMany(mappedBy = "plate", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("plate-review")  // Allow serialization of reviews
    private List<Review> review = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "delivery_plates",
            joinColumns = @JoinColumn(name = "plate_id"),
            inverseJoinColumns = @JoinColumn(name = "delivery_id")
    )
    @JsonBackReference("plate-delivery")  // Prevent recursion when serializing deliveries
    private List<Delivery> deliveries = new ArrayList<>();

    // INDEPENDENT FIELDS
    private float price;
    private int discount;
    private String plateImage;
    private String description;

    // CONSTRUCTORS
    public Plate() {}

    public Plate(Cuisine cuisine, float price, int discount, String plateImage, String description) {
        this.cuisine = cuisine;
        this.price = price;
        this.discount = discount;
        this.plateImage = plateImage;
        this.description = description;
    }

    // GETTERS AND SETTERS
    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }

    public int getDiscount() {
        return discount;
    }
    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public String getPlateImage() {
        return plateImage;
    }
    public void setPlateImage(String plateImage) {
        this.plateImage = plateImage;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Cuisine getCuisine() {
        return cuisine;
    }
    public void setCuisine(Cuisine cuisine) {
        this.cuisine = cuisine;
    }

    public List<Review> getReview() {
        return review;
    }
    public void setReview(List<Review> review) {
        this.review = review;
    }

    public List<Delivery> getDeliveries() {
        return deliveries;
    }
    public void setDeliveries(List<Delivery> deliveries) {
        this.deliveries = deliveries;
    }

    // Custom getter for Cuisine to only return its name in JSON response
    @JsonGetter("cuisine")
    public String getCuisineName() {
        return this.cuisine != null ? this.cuisine.getName() : null;
    }

    // OVERRIDE EQUALS AND HASHCODE TO AVOID ISSUES IN COLLECTIONS
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Plate plate = (Plate) obj;
        return getId() == plate.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Plate{" +
                "id=" + getId() +
                ", name='" + getName() + '\'' +
                ", price=" + price +
                ", discount=" + discount +
                ", description='" + description + '\'' +
                ", cuisine=" + (cuisine != null ? cuisine.getName() : "None") +
                '}';
    }
}

