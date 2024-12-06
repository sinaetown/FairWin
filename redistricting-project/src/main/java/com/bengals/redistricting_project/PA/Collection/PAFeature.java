package com.bengals.redistricting_project.PA.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PAFeature {
    private String type;
    private PAProperties properties;
    private PAGeometry geometry;
}
