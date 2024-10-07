package com.bengals.redistricting_project.Dto;

import com.bengals.redistricting_project.Collection.Book;
import com.bengals.redistricting_project.Collection.BookName;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.stream.Collectors;

@Builder
@Getter
public class BookDto {
    private String bookName; // You can customize the string representation as needed
    private String authorName;

    public static BookDto toBookDto(Book book) { //Entity -> ResDto
        BookDtoBuilder bookDtoBuilder = BookDto.builder();
        return bookDtoBuilder
                .bookName(formatBookName(book.getBookName())) // Format book name as needed
                .authorName(book.getAuthorName())
                .build();
    }

    // This method formats the BookName object into a string
    private static String formatBookName(BookName bookName) {
        String firstFormatted = bookName.getFirst().stream()
                .map(list -> String.join(", ", list))
                .collect(Collectors.joining("; "));

        String secondFormatted = bookName.getSecond().stream()
                .map(list -> String.join(", ", list))
                .collect(Collectors.joining("; "));

        return "First: " + firstFormatted + " | Second: " + secondFormatted;
    }
}
