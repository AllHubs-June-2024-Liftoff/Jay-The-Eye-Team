package org.launchcode.springboot_backend.models;

import jakarta.persistence.*;
import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.models.Plate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToMany
    @JoinTable(
            name = "delivery_plates",
            joinColumns = @JoinColumn(name = "delivery_id"),
            inverseJoinColumns = @JoinColumn(name = "plate_id")
    )
    private List<Plate> plates;

    private LocalDateTime dateCreated;

    @Enumerated(EnumType.STRING)
    private Status status;

    private double grandTotal;  // Store the total cost of the order

    @ElementCollection
    @CollectionTable(name = "delivery_plate_quantities", joinColumns = @JoinColumn(name = "delivery_id"))
    @MapKeyJoinColumn(name = "plate_id")
    @Column(name = "quantity")
    private Map<Plate, Integer> plateQuantities = new HashMap<>();  // Track plate quantities

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }


    public void setDateCreated(LocalDateTime now) {
        this.dateCreated = now;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setPlates(List<Plate> plates) {
        this.plates = plates;
    }

    public enum Status {
        NEW, PENDING, COMPLETED
    }

    // Getters and Setters
    public double getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(double grandTotal) {
        this.grandTotal = grandTotal;
    }

    public Map<Plate, Integer> getPlateQuantities() {
        return plateQuantities;
    }

    public void setPlateQuantities(Map<Plate, Integer> plateQuantities) {
        this.plateQuantities = plateQuantities;
    }

    public int getId() {
        return id;
    }


    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public Status getStatus() {
        return status;
    }

}
