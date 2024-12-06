package com.bengals.redistricting_project.PA.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PAGeometry {
    private String type;
    private List<List<List<Double>>> coordinates;
}
