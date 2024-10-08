package com.bengals.redistricting_project.AL.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ALFeature {
    private String type;
    private ALProperties properties;
    private ALGeometry geometry;
}
