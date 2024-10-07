package com.bengals.redistricting_project.Collection;

import com.bengals.redistricting_project.Dto.PrecinctFindAllResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Precinct")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Precinct {
    @Id
    private ObjectId id;
    private String type;
    private List<PrecinctFeature> features;
}