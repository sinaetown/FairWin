package com.bengals.redistricting_project.MS.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class MSCrs {
    private String type;
    private MSCrsProperties properties;
}
