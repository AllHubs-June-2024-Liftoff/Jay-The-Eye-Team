package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer>, PagingAndSortingRepository<Customer, Integer> {
    Optional<Customer> findByEmail(String email);
}

