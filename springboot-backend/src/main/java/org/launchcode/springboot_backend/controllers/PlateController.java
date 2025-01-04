package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Cuisine;
import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.repositories.CuisineRepository;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/plates")
public class PlateController {

    @Autowired
    private PlateRepository plateRepository;

    @Autowired
    private CuisineRepository cuisineRepository;

    // List all plates (MVC)
    @RequestMapping("list-plates")
    public String listAllPlates(Model model,
                                @RequestParam(value = "sort", defaultValue = "name") String sortBy) {
        Sort sort = Sort.by(Sort.Order.asc(sortBy));

        Iterable<Cuisine> cuisines = cuisineRepository.findAll(sort);
        model.addAttribute("cuisines", cuisines);

        Iterable<Plate> plates = plateRepository.findAll(sort);
        model.addAttribute("plates", plates);
        return "/plates/list-plates";
    }

    /// Display the form to add a new plate (MVC)
    @GetMapping("add-plate")
    public String displayAddPlateForm(Model model) {
        Sort sort = Sort.by(Sort.Order.asc("name"));
        Iterable<Cuisine> cuisines = cuisineRepository.findAll(sort);

        model.addAttribute("cuisines", cuisines);
        model.addAttribute("plate", new Plate());
        return "plates/add-plate";
    }

    // Process the form to add a new plate (MVC)
    @PostMapping("add-plate")
    public String processAddPlateForm(@ModelAttribute @Valid Plate newPlate,
                                      @RequestParam(value = "cuisine", required = false) Integer cuisineId,
                                      Errors errors, Model model) {
        if (errors.hasErrors()) {
            return "plates/add-plate";
        } else {
            if (cuisineId != null) {
                Optional<Cuisine> optionalCuisine = cuisineRepository.findById(cuisineId);
                if (optionalCuisine.isPresent()) {
                    newPlate.setCuisine(optionalCuisine.get());
                } else {
                    errors.rejectValue("cuisine", "error.cuisine.notfound",
                            "Selected cuisine not found");
                    return "plates/add-plate";
                }
            }
            plateRepository.save(newPlate);
        }
        return "redirect:/plates/list-plates";
    }
}
