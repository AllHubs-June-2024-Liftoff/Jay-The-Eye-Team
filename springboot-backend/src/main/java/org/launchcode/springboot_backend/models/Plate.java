package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Plate extends AbstractEntity {

//    database columns:
//    id
//    name
//    description
//    cuisine_tag
//    price
//    discount
//    picture_link
//    orders
//    favorites
//    review

    // RELATIONAL
    @ManyToOne
    @JoinColumn(name = "cuisine", nullable = false)
    @JsonManagedReference // Prevent recursion in api data
    private Cuisine cuisine;

    @OneToMany(mappedBy = "plate", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Review> review = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "delivery_plate",
            joinColumns = @JoinColumn(name = "plate_id"),
            inverseJoinColumns = @JoinColumn(name = "delivery_id")
    )
    private List<Delivery> delivery = new ArrayList<>();

    // INDEPENDENT
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

    // Custom getter for Cuisine to only return its name in JSON
    @JsonGetter("cuisine")
    public String getCuisineName() {
        return this.cuisine != null ? this.cuisine.getName() : null;
    }
}
