package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.Favorite;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends CrudRepository<Favorite, Integer>, PagingAndSortingRepository<Favorite, Integer> {
}

