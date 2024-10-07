package com.bengals.redistricting_project.Repository;

import com.bengals.redistricting_project.Collection.Precinct;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PrecinctRepository extends MongoRepository<Precinct, ObjectId> {
    @Query("{ 'features.properties.index': ?0 }")
    Precinct findByFeatureIndex(String index);
}
