package org.launchcode.springboot_backend.models.data;

import org.launchcode.springboot_backend.models.Plates;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatesRepository extends CrudRepository<Plates, Integer> {
}
