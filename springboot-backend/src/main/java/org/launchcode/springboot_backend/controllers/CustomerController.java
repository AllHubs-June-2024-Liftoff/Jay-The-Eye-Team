package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("list-customers")
    public String listAllCustomers(Model model) {
        Sort sort = Sort.by(Sort.Order.asc("nameLast"));
        model.addAttribute("customers", customerRepository.findAll(sort));
        return "customers/list-customers";
    }
}