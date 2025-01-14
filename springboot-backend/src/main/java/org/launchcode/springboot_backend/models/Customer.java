package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;


@Entity
public class Customer extends AbstractEntity {

//    database columns:
//    id
//    first_name
//    last_name
//    email
//    isChef
//    delivery
//    favorites

    // RELATIONAL
    @OneToMany
    @JsonManagedReference
    private List<Delivery> delivery;

    @OneToMany(mappedBy = "customer")
    private List<Favorite> favorites;

    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    // INDEPENDENT
    private boolean isChef;

    @NotNull(message = "⚠\uFE0F Field cannot be empty")
    @Size(min=1, max=255, message = "⚠\uFE0F Text length is out of bounds")
    private String nameFirst;

    @NotNull(message = "⚠\uFE0F Field cannot be empty")
    @Size(min=1, max=255, message = "⚠\uFE0F Text length is out of bounds")
    private String nameLast;

    @NotNull(message = "⚠\uFE0F Location cannot be empty")
    @Size(min=1, max=255, message = "⚠\uFE0F Text length is out of bounds")
    private String address;

    @NotNull(message = "⚠️ Email cannot be empty")
    @Email(message = "⚠️ Invalid email format")
    @Size(max = 255, message = "⚠️ Email length is out of bounds")
    private String email;

    @NotNull(message = "⚠️ Phone number cannot be empty")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "⚠️ Invalid phone number format")
    private String phone;

    // CONSTRUCTORS
    public Customer() {}

    public Customer(String nameFirst, String nameLast, String address,
                    String email, String phone, boolean isChef) {
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.isChef = isChef;
    }

    // GETTERS & SETTERS
    public List<Delivery> getDeliveries() { return delivery; }

    @Override
    public void setName(String name) {
        super.setName(getFullName());
    }
    public String getFullName() {
        return nameFirst + " " + nameLast;
    }

    public List<Delivery> getDelivery() {
        return delivery;
    }
    public void setDelivery(List<Delivery> delivery) {
        this.delivery = delivery;
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
    public void setEmail (String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
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

    public boolean isChef() {
        return isChef;
    }
    public void setChef(boolean chef) {
        isChef = chef;
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
}
