package com.bengals.redistricting_project.Collection;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hi-collection")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Book {
    private BookName bookName;
    private String authorName;
}
