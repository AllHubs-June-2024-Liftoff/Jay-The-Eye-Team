package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.models.Customer;
import org.launchcode.springboot_backend.models.User;
import org.launchcode.springboot_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String password = payload.get("password");

            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                if (user.isMatchingPassword(password)) {
                    Customer customer = user.getCustomer();

                    Map<String, Object> response = new HashMap<>();
                    response.put("email", user.getEmail());
                    response.put("isChef", customer.isChef());
                    response.put("firstName", customer.getNameFirst());
                    response.put("lastName", customer.getNameLast());

                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.status(401).body("Invalid password");
                }
            } else {
                return ResponseEntity.status(404).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}
