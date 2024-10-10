package com.bengals.redistricting_project.MS.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class MSProperties {
    private int C_TOT20;
    private int VAP_TOT20;
    private int C_ASN20;
    private int C_BLK20;
    private int C_WHT20;
    private int C_HSP20;
    private String DEM_VOTE;
    private String REP_VOTE;
    private String WINNER;
    private String centroid;
}
