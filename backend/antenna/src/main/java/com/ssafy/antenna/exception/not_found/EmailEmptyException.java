package com.ssafy.antenna.exception.not_found;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.EMAIL_EMPTY;

public class EmailEmptyException extends AbstractAppException {
    public EmailEmptyException() {
        super(EMAIL_EMPTY);
    }
}
