package com.bengals.redistricting_project.AL;

import com.bengals.redistricting_project.AL.Collection.ALDistrict;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ALDistrictRepository extends MongoRepository<ALDistrict, ObjectId> {
}
