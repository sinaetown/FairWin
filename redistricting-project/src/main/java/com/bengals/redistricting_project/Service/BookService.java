package com.bengals.redistricting_project.Service;

import com.bengals.redistricting_project.Collection.Book;
import com.bengals.redistricting_project.Dto.BookDto;
import com.bengals.redistricting_project.Repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private final BookRepo bookRepo;

    public BookService(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }

    public List<BookDto> findAll() {
        List<BookDto> bookDtos = new ArrayList<>();
        for (Book book : bookRepo.findAll()) {
            bookDtos.add(BookDto.toBookDto(book));
        }
        return bookDtos;
    }

}
