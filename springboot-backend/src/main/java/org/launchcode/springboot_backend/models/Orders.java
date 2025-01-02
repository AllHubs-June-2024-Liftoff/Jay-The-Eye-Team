package org.launchcode.springboot_backend.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Orders {

//    database columns:
//    id
//    user_id
//    date_created
//    plate_id
//    status

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Users users;

    private String dateCreated;

    @ManyToOne
    private Plates plates;

    public enum Status {
        NEW, PENDING, COMPLETED
    }

    @Enumerated(EnumType.STRING)
    private Status status;

    public Orders() {}

    public Orders(Users users, String dateCreated, Plates plates, Status status) {
        this.users = users;
        this.dateCreated = dateCreated;
        this.plates = plates;
        this.status = status;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Plates getPlates() {
        return plates;
    }

    public void setPlates(Plates plates) {
        this.plates = plates;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Orders orders = (Orders) o;
        return id == orders.id && Objects.equals(users, orders.users) && Objects.equals(dateCreated, orders.dateCreated) && Objects.equals(plates, orders.plates) && status == orders.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, users, dateCreated, plates, status);
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", users=" + users +
                ", dateCreated='" + dateCreated + '\'' +
                ", plates=" + plates +
                ", status=" + status +
                '}';
    }
}
