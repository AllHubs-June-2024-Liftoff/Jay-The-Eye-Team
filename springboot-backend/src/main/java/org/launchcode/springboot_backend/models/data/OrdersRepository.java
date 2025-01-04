package org.launchcode.springboot_backend.models.data;

import org.launchcode.springboot_backend.models.Orders;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends CrudRepository<Orders, Integer> {
}
