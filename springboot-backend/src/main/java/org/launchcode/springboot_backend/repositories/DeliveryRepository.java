package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.Delivery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DeliveryRepository extends CrudRepository<Delivery, Integer>, PagingAndSortingRepository<Delivery, Integer> {

    @Query(value = "SELECT * FROM delivery WHERE customer_id = :customer_id", nativeQuery = true)
    List<Delivery> findByCustomerId(@Param("customer_id") int customer_id);
}
