package com.bengals.redistricting_project.MS;

import com.bengals.redistricting_project.MS.Collection.MSDistrict;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MSService {

    private final MSDistrictRepository msDistrictRepository;

    public MSService(MSDistrictRepository msDistrictRepository) {
        this.msDistrictRepository = msDistrictRepository;
    }

    public List<MSDistrict> findAllDistricts() {
        return msDistrictRepository.findAll();  // This already returns a List
    }
}
