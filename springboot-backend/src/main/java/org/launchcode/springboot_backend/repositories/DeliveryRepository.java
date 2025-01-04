package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.Delivery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends CrudRepository<Delivery, Integer>, PagingAndSortingRepository<Delivery, Integer> {
}