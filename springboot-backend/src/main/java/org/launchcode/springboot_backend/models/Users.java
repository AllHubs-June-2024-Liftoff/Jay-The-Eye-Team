package org.launchcode.springboot_backend.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
public class Users {

//    database columns:
//    id
//    first_name
//    last_name
//    email
//    isChef
//    orders
//    favorites

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;
    private String lastName;
    private String email;
    private boolean isChef;

    @OneToMany(mappedBy = "users")
    private List<Orders> orders;

    @OneToMany(mappedBy = "users")
    private List<Favorites> favorites;

    public Users() {}

    public Users(String firstName, String lastName, String email, boolean isChef) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isChef = isChef;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isChef() {
        return isChef;
    }

    public void setChef(boolean chef) {
        isChef = chef;
    }

    public List<Orders> getOrders() {
        return orders;
    }

    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }

    public List<Favorites> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<Favorites> favorites) {
        this.favorites = favorites;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Users users = (Users) o;
        return id == users.id && isChef == users.isChef && Objects.equals(firstName, users.firstName) && Objects.equals(lastName, users.lastName) && Objects.equals(email, users.email) && Objects.equals(orders, users.orders) && Objects.equals(favorites, users.favorites);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email, isChef, orders, favorites);
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", isChef=" + isChef +
                ", orders=" + orders +
                ", favorites=" + favorites +
                '}';
    }
}
