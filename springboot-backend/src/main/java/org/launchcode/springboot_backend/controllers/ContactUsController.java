package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.repositories.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ContactUsController {

    @Autowired
    private ContactUsRepository contactUsRepository;

//    @PostMapping

}
