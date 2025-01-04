package org.launchcode.springboot_backend.controllers;

import jakarta.validation.Valid;
import org.launchcode.springboot_backend.models.Cuisine;
import org.launchcode.springboot_backend.repositories.CuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("cuisines")
public class CuisineController {

    @Autowired
    private CuisineRepository cuisineRepository;

    // List all cuisines
    @RequestMapping("list-cuisines")
    public String listAllCuisines(Model model) {
        Sort sort = Sort.by(Sort.Order.asc("name"));
        model.addAttribute("cuisines", cuisineRepository.findAll(sort));
        return "cuisines/list-cuisines";
    }

    // Display the form to add a new cuisine
    @GetMapping("add-cuisine")
    public String displayAddCuisineForm(Model model) {
        Sort sort = Sort.by(Sort.Order.asc("name"));
        Iterable<Cuisine> cuisines = cuisineRepository.findAll(sort);

        model.addAttribute("cuisine", new Cuisine());
        return "cuisines/add-cuisine";
    }

    // Process the form to add a new cuisine
    @PostMapping("add-cuisine")
    public String processAddCuisineForm(@ModelAttribute @Valid Cuisine newCuisine, Errors errors, Model model) {
        if (errors.hasErrors()) {
            return "cuisines/add-cuisine";
        } else {
            cuisineRepository.save(newCuisine);
            return "redirect:/cuisines/list-cuisines";
        }
    }

}
