package com.bengals.redistricting_project.Repository;

import com.bengals.redistricting_project.Collection.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends MongoRepository<Book, Integer> {
}
