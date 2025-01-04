package org.launchcode.springboot_backend.models.data;

import org.launchcode.springboot_backend.models.ContactUs;
import org.launchcode.springboot_backend.models.Favorites;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends CrudRepository<Favorites, Integer> {
}

