package com.bengals.redistricting_project.AL;

import com.bengals.redistricting_project.AL.Collection.ALDistrict;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ALService {

    private final ALDistrictRepository alDistrictRepository;

    public ALService(ALDistrictRepository alDistrictRepository) {
        this.alDistrictRepository = alDistrictRepository;
    }

    public List<ALDistrict> findAllDistricts() {
        return alDistrictRepository.findAll();
    }
}
