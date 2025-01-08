package org.launchcode.springboot_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Cuisine extends AbstractEntity {

    // RELATIONAL
    @OneToMany(mappedBy = "cuisine")
    @JsonBackReference
    private List<Plate> plate = new ArrayList<>();

    // INDEPENDENT
    @NotEmpty(message = "⚠\uFE0F Skills cannot be empty")
    @Size(min = 1, max = 1000, message = "Text length is out of bounds")
    private String description;

    public Cuisine() {}

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public List<Plate> getPlate() {
        return plate;
    }
}
