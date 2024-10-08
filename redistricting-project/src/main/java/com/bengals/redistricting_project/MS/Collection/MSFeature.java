package com.bengals.redistricting_project.MS.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class MSFeature {
    private String type;
    private MSProperties properties;
    private MSGeometry geometry;
}
