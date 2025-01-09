package org.launchcode.springboot_backend.api;


import org.launchcode.springboot_backend.repositories.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("contactUs")
public class ContactUsApi {

    @Autowired
    private ContactUsRepository contactUsRepository;


}
