package org.launchcode.springboot_backend.api;

import org.launchcode.springboot_backend.repositories.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("deliveries")
public class DeliveryApi {

    @Autowired
    private DeliveryRepository deliveryRepository;

    public DeliveryApi() {
    }

}


