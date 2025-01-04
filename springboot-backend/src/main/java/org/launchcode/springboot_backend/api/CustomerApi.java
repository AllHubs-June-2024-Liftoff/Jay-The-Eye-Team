package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customers")
public class CustomerApi {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("api")
    public Iterable<Customer> getCustomersData() {
        Sort sort = Sort.by(Sort.Order.asc("name"));
        return customerRepository.findAll(sort);
    }

    @PostMapping("api")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        // Validate required fields
        if (customer.getEmail() == null || customer.getNameFirst() == null || customer.getNameLast() == null) {
            return ResponseEntity.badRequest().body("Required fields are missing.");
        }

        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("Email is already registered.");
        }

        Customer savedCustomer = customerRepository.save(customer);
        return ResponseEntity.status(201).body(savedCustomer);
    }
}