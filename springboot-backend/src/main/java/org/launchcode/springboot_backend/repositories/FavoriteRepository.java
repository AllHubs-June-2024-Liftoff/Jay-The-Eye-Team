package org.launchcode.springboot_backend.repositories;
import org.launchcode.springboot_backend.models.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    Optional<Favorite> findByCustomerIdAndPlatesId(int customerId, int platesId);
    List<Favorite> findAllByCustomerId(int customerId);

}

