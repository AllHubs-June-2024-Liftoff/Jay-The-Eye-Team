package org.launchcode.springboot_backend.repositories;

import org.launchcode.springboot_backend.models.ContactUs;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsRepository extends CrudRepository<ContactUs, Integer>, PagingAndSortingRepository<ContactUs, Integer> {
}
