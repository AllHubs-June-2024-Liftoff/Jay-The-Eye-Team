package org.launchcode.springboot_backend.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
public class Plates {

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private String cuisineTag;
    private Double price;
    private Double discount;
    private String pictureLink;

    @OneToMany(mappedBy = "plates")
    private List<Orders> orders;

    @OneToMany(mappedBy = "plates")
    private List<Favorites> favorites;

    @OneToMany(mappedBy = "plates")
    private List<Reviews> reviews;

    public Plates(String name, String description, String cuisineTag, double price, Double discount, String pictureLink) {
        this.name = name;
        this.description = description;
        this.cuisineTag = cuisineTag;
        this.price = price;
        this.discount = discount;
        this.pictureLink = pictureLink;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCuisineTag() {
        return cuisineTag;
    }

    public void setCuisineTag(String cuisineTag) {
        this.cuisineTag = cuisineTag;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getPictureLink() {
        return pictureLink;
    }

    public void setPictureLink(String pictureLink) {
        this.pictureLink = pictureLink;
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

    public List<Reviews> getReviews() {
        return reviews;
    }

    public void setReviews(List<Reviews> reviews) {
        this.reviews = reviews;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plates plates = (Plates) o;
        return id == plates.id && Objects.equals(name, plates.name) && Objects.equals(description, plates.description) && Objects.equals(cuisineTag, plates.cuisineTag) && Objects.equals(price, plates.price) && Objects.equals(discount, plates.discount) && Objects.equals(pictureLink, plates.pictureLink) && Objects.equals(orders, plates.orders) && Objects.equals(favorites, plates.favorites) && Objects.equals(reviews, plates.reviews);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, cuisineTag, price, discount, pictureLink, orders, favorites, reviews);
    }

    @Override
    public String toString() {
        return "Plates{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", cuisineTag='" + cuisineTag + '\'' +
                ", price=" + price +
                ", discount=" + discount +
                ", pictureLink='" + pictureLink + '\'' +
                ", orders=" + orders +
                ", favorites=" + favorites +
                ", reviews=" + reviews +
                '}';
    }
}
