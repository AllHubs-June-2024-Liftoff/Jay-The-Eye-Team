package org.launchcode.springboot_backend.models.data;

import org.launchcode.springboot_backend.models.ContactUs;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsRepository extends CrudRepository<ContactUs, Integer> {
}
