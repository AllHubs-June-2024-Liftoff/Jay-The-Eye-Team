package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Cuisine;
import org.launchcode.springboot_backend.models.Plate;
import org.launchcode.springboot_backend.repositories.CuisineRepository;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/plates")
public class PlateController {

    @Autowired
    private PlateRepository plateRepository;

    @Autowired
    private CuisineRepository cuisineRepository;

    // List all plates (MVC)
    @RequestMapping("/list-plates")
    public String listAllPlates(Model model,
                                @RequestParam(value = "sort", defaultValue = "name") String sortBy) {
        List<Plate> plates = new ArrayList<>();
        plateRepository.findAll().forEach(plates::add);

        // Sort plates manually based on the requested parameter
        if ("name".equals(sortBy)) {
            plates.sort(Comparator.comparing(Plate::getName));
        } else if ("price".equals(sortBy)) {
            plates.sort(Comparator.comparing(Plate::getPrice));
        }

        List<Cuisine> cuisines = new ArrayList<>();
        cuisineRepository.findAll().forEach(cuisines::add);
        cuisines.sort(Comparator.comparing(Cuisine::getName));

        model.addAttribute("plates", plates);
        model.addAttribute("cuisines", cuisines);
        return "plates/list-plates";
    }

    // Display the form to add a new plate (MVC)
    @GetMapping("/add-plate")
    public String displayAddPlateForm(Model model) {
        List<Cuisine> cuisines = new ArrayList<>();
        cuisineRepository.findAll().forEach(cuisines::add);
        cuisines.sort(Comparator.comparing(Cuisine::getName));

        model.addAttribute("cuisines", cuisines);
        model.addAttribute("plate", new Plate());
        return "plates/add-plate";
    }

    // Process the form to add a new plate (MVC)
    @PostMapping("/add-plate")
    public String processAddPlateForm(@ModelAttribute @Valid Plate newPlate,
                                      @RequestParam(value = "cuisine", required = false) Integer cuisineId,
                                      Errors errors, Model model) {
        if (errors.hasErrors()) {
            return "plates/add-plate";
        }

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
        return "redirect:/plates/list-plates";
    }
}
