package com.bengals.redistricting_project.Dto;

import com.bengals.redistricting_project.Collection.Precinct;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
@Builder
@Getter
public class PrecinctFindAllResDto {
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
    private List<List<List<Double>>> coordinates;  // Updated to match GeoJSON structure

    public static List<PrecinctFindAllResDto> toPrecinctResDtoList(Precinct precinct, int featureNumber) {
        List<PrecinctFindAllResDto> precinctResDtoList = new ArrayList<>();
        for (int i = 0; i < featureNumber; i++) {
            precinctResDtoList.add(
                    PrecinctFindAllResDto.builder()
                            .index(precinct.getFeatures().get(i).getProperties().getIndex())
                            .REL_ID(precinct.getFeatures().get(i).getProperties().getREL_ID())
                            .NEIGH_LIST(precinct.getFeatures().get(i).getProperties().getNEIGH_LIST())
                            .DISTRICT(precinct.getFeatures().get(i).getProperties().getDISTRICT())
                            .POP(precinct.getFeatures().get(i).getProperties().getPOP())
                            .VAP(precinct.getFeatures().get(i).getProperties().getVAP())
                            .PRE20_R(precinct.getFeatures().get(i).getProperties().getPRE20_R())
                            .PRE20_D(precinct.getFeatures().get(i).getProperties().getPRE20_D())
                            .SEN20_R(precinct.getFeatures().get(i).getProperties().getSEN20_R())
                            .SEN20_D(precinct.getFeatures().get(i).getProperties().getSEN20_D())
                            .coordinates(precinct.getFeatures().get(i).getGeometry().getCoordinates())  // Already handles List<List<List<Double>>>
                            .build());
        }
        return precinctResDtoList;
    }
}