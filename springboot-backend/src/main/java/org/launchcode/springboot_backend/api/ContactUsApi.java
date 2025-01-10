package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.models.ContactUs;
import org.launchcode.springboot_backend.repositories.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("contactus")
public class ContactUsApi {

    @Autowired
    private ContactUsRepository contactUsRepository;

    @GetMapping("api")
    public Iterable<ContactUs> getReviewsData() {
        Sort sort = Sort.by(Sort.Order.asc("id"));
        return contactUsRepository.findAll(sort);
    }

    @PostMapping("api-update")
    public ResponseEntity<ContactUs> createNewContactUsMessage(@RequestBody Map<String, Object> requestBody) {

        try {
            // Extract and convert the data with null checks
            String name = (String) requestBody.get("name");
            String email = (String) requestBody.get("email");
            String comment = (String) requestBody.get("comment");

            // Create and save the new comment to the repo
            ContactUs newMessage = new ContactUs(name, email, comment);
            contactUsRepository.save(newMessage);
            return ResponseEntity.ok(newMessage);

        } catch (Exception e) {
            // Log the error and return an internal server error
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}