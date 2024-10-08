package com.bengals.redistricting_project.AL;

import com.bengals.redistricting_project.AL.Collection.ALDistrict;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ALController {
    private final ALService ALService;

    public ALController(ALService ALService) {
        this.ALService = ALService;
    }

    @GetMapping("/al/all/districts")
    public List<ALDistrict> getAllDistricts() {
        return ALService.findAllDistricts();
    }
}
