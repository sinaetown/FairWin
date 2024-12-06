package com.bengals.redistricting_project.PA.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "PAdistrict")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PADistrict {
    @Id
    private ObjectId id;
    private String type;
    private PACrs crs;
    private List<PAFeature> features;
}
