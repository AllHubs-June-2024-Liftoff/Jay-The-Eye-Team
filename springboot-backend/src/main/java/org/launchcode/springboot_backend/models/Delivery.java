package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Delivery {

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

    // RELATIONAL
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonManagedReference // Prevent recursion in api data
    private Customer customer;

    @ManyToMany
    @JoinTable(
            name = "delivery_plates",
            joinColumns = @JoinColumn(name = "plate_id"),
            inverseJoinColumns = @JoinColumn(name = "delivery_id"))
    @JsonManagedReference // Prevent recursion in api data
    private List<Plate> plates;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<Plate> getPlates() {
        return plates;
    }

    public void setPlates(List<Plate> plates) {
        this.plates = plates;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
