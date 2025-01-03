package org.launchcode.springboot_backend.models.data;

import org.launchcode.springboot_backend.models.Reviews;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewsRepository extends CrudRepository<Reviews, Integer> {
}
