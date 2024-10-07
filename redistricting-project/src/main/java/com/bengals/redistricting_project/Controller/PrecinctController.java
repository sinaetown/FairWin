package com.bengals.redistricting_project.Controller;

import com.bengals.redistricting_project.Dto.PrecinctFindCoordinatesResDto;
import com.bengals.redistricting_project.Dto.PrecinctReqDto;
import com.bengals.redistricting_project.Dto.PrecinctFindAllResDto;
import com.bengals.redistricting_project.Service.PrecinctService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class PrecinctController {

    private final PrecinctService precinctService;

    public PrecinctController(PrecinctService precinctService) {
        this.precinctService = precinctService;
    }

    @GetMapping("/precincts")
    public List<PrecinctFindAllResDto> allPrecincts() {
        return precinctService.findAll();
    }

    @GetMapping("/precinct")
    public PrecinctFindCoordinatesResDto findPrecinct(@RequestBody PrecinctReqDto reqDto) {
        PrecinctFindCoordinatesResDto precinctFindCoordinatesResDto = precinctService.findByIndex(reqDto);
        return precinctFindCoordinatesResDto;
    }
}
