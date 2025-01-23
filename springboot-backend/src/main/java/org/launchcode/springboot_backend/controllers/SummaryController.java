package org.launchcode.springboot_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.launchcode.springboot_backend.repositories.CuisineRepository;
import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.launchcode.springboot_backend.repositories.DeliveryRepository;

@Controller
@RequestMapping("summary")
public class SummaryController {

    private final PlateRepository plateRepository;
    private final CuisineRepository cuisineRepository;
    private final CustomerRepository customerRepository;
    private final DeliveryRepository deliveryRepository;

    // Constructor injection for all repositories
    @Autowired
    public SummaryController(PlateRepository plateRepository,
                             CuisineRepository cuisineRepository,
                             CustomerRepository customerRepository,
                             DeliveryRepository deliveryRepository) {
        this.plateRepository = plateRepository;
        this.cuisineRepository = cuisineRepository;
        this.customerRepository = customerRepository;
        this.deliveryRepository = deliveryRepository;
    }

    @GetMapping("")
    public String index(Model model) {


        long totalPlates = plateRepository.count();
        model.addAttribute("totalPlates", totalPlates);

        long totalCustomers = customerRepository.count();
        model.addAttribute("totalCustomers", totalCustomers);

        long totalCuisines = cuisineRepository.count();
        model.addAttribute("totalCuisines", totalCuisines);

        long totalDeliveries = deliveryRepository.count();
        model.addAttribute("totalDeliveries", totalDeliveries);

        Double totalRevenue = deliveryRepository.getGrandTotalRevenue();
        String formattedRevenue = String.format("%.0f", totalRevenue);
        model.addAttribute("totalRevenue", formattedRevenue);

        return "summary";
    }
}
