package org.launchcode.springboot_backend.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Favorites {

//    database columns:
//    id
//    user
//    plate

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Users users;

    @ManyToOne
    private Plates plates;

    public Favorites() {}

    public Favorites(Users users, Plates plates) {
        this.users = users;
        this.plates = plates;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Plates getPlates() {
        return plates;
    }

    public void setPlates(Plates plates) {
        this.plates = plates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Favorites favorites = (Favorites) o;
        return id == favorites.id && Objects.equals(users, favorites.users) && Objects.equals(plates, favorites.plates);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, users, plates);
    }

    @Override
    public String toString() {
        return "Favorites{" +
                "id=" + id +
                ", users=" + users +
                ", plates=" + plates +
                '}';
    }
}
