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
    private Plates plates;

    private String reviewText;
    private int reviewStars;
    private String date;

    public Reviews() {
    }

    public Reviews(Plates plates, String reviewText, int reviewStars, String date) {
        this.plates = plates;
        this.reviewText = reviewText;
        this.reviewStars = reviewStars;
        this.date = date;
    }

    public Plates getPlates() {
        return plates;
    }

    public void setPlates(Plates plates) {
        this.plates = plates;
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
        return id == reviews.id && reviewStars == reviews.reviewStars && Objects.equals(plates, reviews.plates) && Objects.equals(reviewText, reviews.reviewText) && Objects.equals(date, reviews.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, plates, reviewText, reviewStars, date);
    }

    @Override
    public String toString() {
        return "Reviews{" +
                "id=" + id +
                ", plate=" + plates +
                ", reviewText='" + reviewText + '\'' +
                ", reviewStars=" + reviewStars +
                ", date='" + date + '\'' +
                '}';
    }
}
