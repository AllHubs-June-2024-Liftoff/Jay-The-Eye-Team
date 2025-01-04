package org.launchcode.springboot_backend.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class ContactUs {

//    database columns:
//    id
//    comment
//    name
//    email
//    date

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String comment;
    private String name;
    private String email;
    private String date;

    public ContactUs() {}

    public ContactUs(String comment, String name, String email, String date) {
        this.comment = comment;
        this.name = name;
        this.email = email;
        this.date = date;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
        ContactUs contactUs = (ContactUs) o;
        return id == contactUs.id && Objects.equals(comment, contactUs.comment) && Objects.equals(name, contactUs.name) && Objects.equals(email, contactUs.email) && Objects.equals(date, contactUs.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, comment, name, email, date);
    }

    @Override
    public String toString() {
        return "ContactUs{" +
                "id=" + id +
                ", comment='" + comment + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
