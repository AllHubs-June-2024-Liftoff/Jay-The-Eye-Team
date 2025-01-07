package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.models.User;
import org.launchcode.springboot_backend.repositories.CustomerRepository;
import org.launchcode.springboot_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> payload) {
        System.out.println("Register endpoint hit with payload: " + payload);
        try {
            String email = payload.get("email");
            String password = payload.get("password");
            String nameFirst = payload.get("nameFirst");
            String nameLast = payload.get("nameLast");
            String address = payload.get("address");
            String phone = payload.get("phone");
            boolean isChef = Boolean.parseBoolean(payload.get("isChef"));

            // Log incoming email for debugging
            System.out.println("Checking email: " + email);

            Optional<User> existingUser = userRepository.findByEmail(email);
            System.out.println("Find by email returned: " + (existingUser.isPresent() ? existingUser.get() : "null"));
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest().body("Email already exists!");
            }


            User user = new User(email, password);
            userRepository.save(user);

            Customer customer = new Customer();
            customer.setNameFirst(nameFirst);
            customer.setNameLast(nameLast);
            customer.setAddress(address);
            customer.setPhone(phone);
            customer.setEmail(email);
            customer.setChef(isChef);
            customer.setUser(user);
            customer.setName(nameFirst + " " + nameLast);

            customerRepository.save(customer);

            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}
