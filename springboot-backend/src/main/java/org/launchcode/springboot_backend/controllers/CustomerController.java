package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("list-customers")
    public String listAllCustomers(Model model) {
        Sort sort = Sort.by(Sort.Order.asc("nameLast"));
        Iterable<Customer> customers = customerRepository.findAll(sort);

        // Convert Iterable to List
        List<Customer> customerList = new ArrayList<>();
        customers.forEach(customerList::add);

        // Filter for customers only (where is_chef is false)
        List<Customer> filteredCustomers = customerList.stream()
                .filter(customer -> !customer.isChef())
                .collect(Collectors.toList());

        model.addAttribute("customers", filteredCustomers);
        return "customers/list-customers";
    }
}