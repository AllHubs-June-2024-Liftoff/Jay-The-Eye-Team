package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.repositories.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @GetMapping("list-deliveries")
    public String listAllDeliveries(Model model) {
        Sort sort = Sort.by(Sort.Order.asc("dateCreated"));
        model.addAttribute("deliveries", deliveryRepository.findAll(sort));
        return "deliveries/list-deliveries";
    }

}


