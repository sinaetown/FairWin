package com.bengals.redistricting_project.MS;

import com.bengals.redistricting_project.MS.Collection.MSDistrict;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MSDistrictRepository extends MongoRepository<MSDistrict, ObjectId> {
}
