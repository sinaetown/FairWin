package com.bengals.redistricting_project.AL.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "ALdistrict")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ALDistrict {
    @Id
    private ObjectId id;
    private String type;
    private ALCrs crs;
    private List<ALFeature> features;
}
