package com.bengals.redistricting_project.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrecinctFeature {
    private String type;
    private Geo geometry;
    private Properties properties;
}
