package org.launchcode.springboot_backend.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Favorite {

//    database columns:
//    id
//    user
//    plate

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Plate plates;

    public Favorite() {}

    public Favorite(Customer customer, Plate plates) {
        this.customer = customer;
        this.plates = plates;
    }

    public Customer getUsers() {
        return customer;
    }

    public void setUsers(Customer customer) {
        this.customer = customer;
    }

    public Plate getPlates() {
        return plates;
    }

    public void setPlates(Plate plates) {
        this.plates = plates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Favorite favorites = (Favorite) o;
        return id == favorites.id && Objects.equals(customer, favorites.customer) && Objects.equals(plates, favorites.plates);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customer, plates);
    }

    @Override
    public String toString() {
        return "Favorites{" +
                "id=" + id +
                ", users=" + customer +
                ", plates=" + plates +
                '}';
    }
}
