package org.launchcode.springboot_backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    // Responds to get requests at /hello?coder=LaunchCoder
    @GetMapping
    public String index() {
        return "index";
    }
}
