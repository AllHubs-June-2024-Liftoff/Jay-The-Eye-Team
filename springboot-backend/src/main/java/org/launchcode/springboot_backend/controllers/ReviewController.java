package org.launchcode.springboot_backend.controllers;

import org.launchcode.springboot_backend.models.Review;
import org.launchcode.springboot_backend.repositories.PlateRepository;
import org.launchcode.springboot_backend.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PlateRepository plateRepository;

    @GetMapping("list-reviews")
    public String listAllReviews(Model model) {

        Sort sort = Sort.by(Sort.Order.desc("id"));
        Iterable<Review> reviews = reviewRepository.findAll(sort);
        model.addAttribute("reviews", reviews);

        return "reviews/list-reviews";
    }

}