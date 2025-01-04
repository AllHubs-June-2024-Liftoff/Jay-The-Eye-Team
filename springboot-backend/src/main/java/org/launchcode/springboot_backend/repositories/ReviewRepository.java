package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Integer>, PagingAndSortingRepository<Review, Integer> {
    // Custom query method to find reviews by plateId
    List<Review> findByPlateId(int plateId);
}
