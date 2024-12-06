package com.bengals.redistricting_project.MS;

import com.bengals.redistricting_project.MS.Collection.MSDistrict;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MSController {
    private final MSService msService;

    public MSController(MSService msService) {
        this.msService = msService;
    }

    @GetMapping("/ms/all/districts")
    public List<MSDistrict> getAllDistricts() {
        return msService.findAllDistricts();
    }


}
