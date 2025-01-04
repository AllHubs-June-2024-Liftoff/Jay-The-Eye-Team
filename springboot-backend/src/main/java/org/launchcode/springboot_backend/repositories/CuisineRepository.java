package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.Cuisine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuisineRepository extends CrudRepository<Cuisine, Integer>, PagingAndSortingRepository<Cuisine, Integer> {
}

