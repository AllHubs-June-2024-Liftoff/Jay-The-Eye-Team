package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
