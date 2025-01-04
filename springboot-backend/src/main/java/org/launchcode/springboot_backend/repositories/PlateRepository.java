package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.Plate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlateRepository extends CrudRepository<Plate, Integer>, PagingAndSortingRepository<Plate, Integer> {
}
