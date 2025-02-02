package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.models.Plate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
public class Delivery {

    // RELATIONAL
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonManagedReference // Prevent recursion in api data
    private Customer customer;

    @ElementCollection
    @CollectionTable(name = "delivery_plate_quantities", joinColumns = @JoinColumn(name = "delivery_id"))
    @MapKeyJoinColumn(name = "plate_id")
    @Column(name = "quantity")
    private Map<Plate, Integer> plateQuantities = new HashMap<>();  // Track plate quantities

    @ManyToMany
    @JoinTable(
      name = "delivery_plates",
      joinColumns = @JoinColumn(name = "delivery_id"),
      inverseJoinColumns = @JoinColumn(name = "plate_id")
    )
    @JsonManagedReference
    private List<Plate> plates;

    // INDEPENDENT
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime dateCreated;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        NEW, PENDING, COMPLETED
    }

    private double grandTotal;  // Store the total cost of the order


    // GETTERS AND SETTERS
    public int getId() {
        return id;
    }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }
    public void setDateCreated(LocalDateTime now) {
        this.dateCreated = now;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Plate> getPlates() {
        return plates;
    }
    public void setPlates(List<Plate> plates) {
        this.plates = plates;
    }

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

    public Status getStatus() {
        return status;
    }

}
