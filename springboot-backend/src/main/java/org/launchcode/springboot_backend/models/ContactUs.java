package org.launchcode.springboot_backend.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
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

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime dateCreated;

    @NotNull(message = "⚠\uFE0F Location cannot be empty")
    @Size(min=1, max=255, message = "⚠\uFE0F Text length is out of bounds")
    private String name;

    @NotNull(message = "⚠️ Email cannot be empty")
    @Email(message = "⚠️ Invalid email format")
    @Size(max = 255, message = "⚠️ Email length is out of bounds")
    private String email;

    @NotEmpty(message = "⚠️ Field cannot be empty")
    @Size(min = 1, max = 1000, message = "Text length is out of bounds")
    @Column(columnDefinition = "TEXT")
    private String comment;

    public ContactUs() {}

    public ContactUs(String name,String email, String comment) {
        this.comment = comment;
        this.name = name;
        this.email = email;
        this.dateCreated = LocalDateTime.now();
    }

    // Getter and Setter methods

    public int getId() {
        return id;
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

    public LocalDateTime getDateCreated() { return dateCreated; }
    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, comment, name, email, dateCreated);
    }

    @Override
    public String toString() {
        return "ContactUs{" +
                "id=" + id +
                ", comment='" + comment + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", date='" + dateCreated + '\'' +
                '}';
    }
}
