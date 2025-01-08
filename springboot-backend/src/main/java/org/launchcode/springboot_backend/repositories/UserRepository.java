package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
