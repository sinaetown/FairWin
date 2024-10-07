package com.bengals.redistricting_project.Dto;

import com.bengals.redistricting_project.Collection.Precinct;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
@Builder
@Getter
public class PrecinctFindCoordinatesResDto {
    private String index;
    private List<List<List<Double>>> coordinates;

    // Converts from PrecinctFindAllResDto to PrecinctFindCoordinatesResDto
    public static PrecinctFindCoordinatesResDto toPrecinctResDto(PrecinctFindAllResDto dto) {
        return PrecinctFindCoordinatesResDto.builder()
                .index(dto.getIndex())
                .coordinates(dto.getCoordinates())
                .build();
    }
}
