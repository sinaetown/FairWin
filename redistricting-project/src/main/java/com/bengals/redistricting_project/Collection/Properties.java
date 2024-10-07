package com.bengals.redistricting_project.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Properties {
    private String index;
    private int REL_ID;
    private String NEIGH_LIST;
    private int DISTRICT;
    private int POP;
    private int VAP;
    private int PRE20_R;
    private int PRE20_D;
    private int SEN20_R;
    private int SEN20_D;
}
