package com.ssafy.antenna.exception.not_found;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.EMAIL_EMPTY;
import static com.ssafy.antenna.exception.ErrorCode.EMAIL_NOT_FOUND;

public class EmailEmptyException extends AbstractAppException {
    public EmailEmptyException() {
        super(EMAIL_EMPTY);
    }
}
