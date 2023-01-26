package com.ssafy.antenna.exception.not_found;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.BOOK_NOT_FOUND;

public class BookNotFoundException extends AbstractAppException {
    public BookNotFoundException() {
        super(BOOK_NOT_FOUND);
    }
}
