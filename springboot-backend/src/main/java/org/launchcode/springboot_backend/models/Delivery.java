package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
public class Delivery {

//    database columns:
//    id
//    user_id
//    date_created
//    plate_id
//    status

    // RELATIONAL
    @ManyToOne
    @JoinColumn(name = "customer", nullable = false)
    @JsonManagedReference // Prevent recursion in api data
    private Customer customer;

    @ManyToMany
    private List<Plate> plate;

    // INDEPENDENT
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime dateCreated;

    @ManyToOne
    private Plate plates;

    public enum Status {
        NEW, PENDING, COMPLETED
    }

    @Enumerated(EnumType.STRING)
    private Status status;

    // Constructors
    public Delivery() {}

    public Delivery(Customer customer, LocalDateTime dateCreated, Plate plates, Status status) {
        this.customer = customer;
        this.dateCreated = dateCreated;
        this.plates = plates;
        this.status = status;
    }

    public Customer getUsers() {
        return customer;
    }
    public void setUsers(Customer customer) {
        this.customer = customer;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }
    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Plate getPlates() {
        return plates;
    }
    public void setPlates(Plate plates) {
        this.plates = plates;
    }

    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Delivery orders = (Delivery) o;
        return id == orders.id && Objects.equals(customer, orders.customer) && Objects.equals(dateCreated, orders.dateCreated) && Objects.equals(plates, orders.plates) && status == orders.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customer, dateCreated, plates, status);
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", users=" + customer +
                ", dateCreated='" + dateCreated + '\'' +
                ", plates=" + plates +
                ", status=" + status +
                '}';
    }
}
