package com.bengals.redistricting_project.Service;

import com.bengals.redistricting_project.Collection.Precinct;
import com.bengals.redistricting_project.Dto.PrecinctFindCoordinatesResDto;
import com.bengals.redistricting_project.Dto.PrecinctReqDto;
import com.bengals.redistricting_project.Dto.PrecinctFindAllResDto;
import com.bengals.redistricting_project.Repository.PrecinctRepository;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.data.mongodb.util.BsonUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class PrecinctService {

    private final PrecinctRepository precinctRepository;

    public PrecinctService(PrecinctRepository precinctRepository) {
        this.precinctRepository = precinctRepository;
    }

    public List<PrecinctFindAllResDto> findAll() {
        List<PrecinctFindAllResDto> precinctResDtos = new ArrayList<>();
        for (Precinct precinct : precinctRepository.findAll()) {
            int featureNumber = precinct.getFeatures().size();
            precinctResDtos = PrecinctFindAllResDto.toPrecinctResDtoList(precinct, featureNumber);
        }
        return precinctResDtos;
    }

    public PrecinctFindCoordinatesResDto findByIndex(PrecinctReqDto precinctReqDto) {
        Precinct precinct = precinctRepository.findByFeatureIndex(precinctReqDto.getIndex());
        int featureNumber = precinct.getFeatures().size();
        for (PrecinctFindAllResDto p : PrecinctFindAllResDto.toPrecinctResDtoList(precinct, featureNumber)) {
            if (p.getIndex().equals(precinctReqDto.getIndex())) {
                return PrecinctFindCoordinatesResDto.toPrecinctResDto(p);
            }
        }
        return null;  // Handle null case or throw an exception if necessary
    }
}
