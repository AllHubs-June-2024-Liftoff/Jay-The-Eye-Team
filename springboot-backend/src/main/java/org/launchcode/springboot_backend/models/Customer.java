package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Customer extends AbstractEntity {

    // RELATIONAL
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Delivery> delivery = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites = new ArrayList<>();

    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    // INDEPENDENT
    @NotNull(message = "⚠️ First name cannot be empty")
    @Size(min = 1, max = 255, message = "⚠️ First name length must be between 1 and 255 characters")
    private String nameFirst;

    @NotNull(message = "⚠️ Last name cannot be empty")
    @Size(min = 1, max = 255, message = "⚠️ Last name length must be between 1 and 255 characters")
    private String nameLast;

    @NotNull(message = "⚠️ Address cannot be empty")
    @Size(min = 1, max = 255, message = "⚠️ Address length must be between 1 and 255 characters")
    private String address;

    @NotNull(message = "⚠️ Email cannot be empty")
    @Email(message = "⚠️ Invalid email format")
    @Size(max = 255, message = "⚠️ Email length is out of bounds")
    private String email;

    @NotNull(message = "⚠️ Phone number cannot be empty")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "⚠️ Invalid phone number format")
    private String phone;

    private boolean isChef;

    // CONSTRUCTORS
    public Customer() {
        this.delivery = new ArrayList<>();
        this.favorites = new ArrayList<>();
    }

    public Customer(String nameFirst, String nameLast, String address, String email, String phone, boolean isChef) {
        this();
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.isChef = isChef;
    }

    // GETTERS & SETTERS
    public List<Delivery> getDelivery() {
        return delivery;
    }

    public void setDelivery(List<Delivery> delivery) {
        this.delivery = delivery;
    }

    public List<Favorite> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<Favorite> favorites) {
        this.favorites = favorites;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNameFirst() {
        return nameFirst;
    }

    public void setNameFirst(String nameFirst) {
        this.nameFirst = nameFirst;
    }

    public String getNameLast() {
        return nameLast;
    }

    public void setNameLast(String nameLast) {
        this.nameLast = nameLast;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isChef() {
        return isChef;
    }

    public void setChef(boolean chef) {
        isChef = chef;
    }

    public String getFullName() {
        return nameFirst + " " + nameLast;
    }
}

