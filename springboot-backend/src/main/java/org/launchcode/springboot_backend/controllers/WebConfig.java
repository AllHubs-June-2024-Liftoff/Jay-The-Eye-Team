package org.launchcode.springboot_backend.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/// Define the global CORS configuration in Spring Boot to allow requests from the React app
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        // Allow CORS requests from the React app (usually localhost:3000 during development)
        registry.addMapping("/**") // Allow CORS on all endpoints
                .allowedOrigins("http://localhost:3000") // Add the URL of your React app here
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allow any header
                .allowCredentials(true); // Allow credentials (cookies, authorization headers, etc.)
    }
}