package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.ContactUs;
import org.launchcode.springboot_backend.repositories.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("messages")
public class ContactUsController {

    @Autowired
    private ContactUsRepository contactUsRepository;

    @GetMapping("")
    public String index(Model model) {

        Sort sort = Sort.by(Sort.Order.desc("id"));
        Iterable<ContactUs> messages = contactUsRepository.findAll(sort);
        model.addAttribute("messages", messages);

        return "contact-us/list-messages";
    }
}
