package com.bengals.redistricting_project.Controller;

import com.bengals.redistricting_project.Collection.Book;
import com.bengals.redistricting_project.Dto.BookCreateDto;
import com.bengals.redistricting_project.Dto.BookDto;
import com.bengals.redistricting_project.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<BookDto> bookList() {
        return bookService.findAll();
    }

}
