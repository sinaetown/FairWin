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
    private int total_pop;
    private int vote_pop;
    private int total_asn;
    private int total_blk;
    private int total_hsp;
    private int total_wht;
    private String vote_dem;
    private String vote_rep;
    private String win_cand;
    private String win_pty;
    private String cen_cord;

}
