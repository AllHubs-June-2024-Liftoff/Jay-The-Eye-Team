package org.launchcode.springboot_backend.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Reviews {

//    database columns:
//    id
//    plate_id
//    review_text
//    review_stars
//    date

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Plates plate;

    private String reviewText;
    private int reviewStars;
    private String date;

    public Reviews() {
    }

    public Reviews(Plates plate, String reviewText, int reviewStars, String date) {
        this.plate = plate;
        this.reviewText = reviewText;
        this.reviewStars = reviewStars;
        this.date = date;
    }

    public Plates getPlate() {
        return plate;
    }

    public void setPlate(Plates plate) {
        this.plate = plate;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public int getReviewStars() {
        return reviewStars;
    }

    public void setReviewStars(int reviewStars) {
        this.reviewStars = reviewStars;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reviews reviews = (Reviews) o;
        return id == reviews.id && reviewStars == reviews.reviewStars && Objects.equals(plate, reviews.plate) && Objects.equals(reviewText, reviews.reviewText) && Objects.equals(date, reviews.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, plate, reviewText, reviewStars, date);
    }

    @Override
    public String toString() {
        return "Reviews{" +
                "id=" + id +
                ", plate=" + plate +
                ", reviewText='" + reviewText + '\'' +
                ", reviewStars=" + reviewStars +
                ", date='" + date + '\'' +
                '}';
    }
}
