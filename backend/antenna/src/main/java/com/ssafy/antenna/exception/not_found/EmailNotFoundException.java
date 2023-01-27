package com.ssafy.antenna.exception.not_found;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.EMAIL_NOT_FOUND;

public class EmailNotFoundException extends AbstractAppException {
    public EmailNotFoundException() {
        super(EMAIL_NOT_FOUND);
    }
}
