package com.ssafy.antenna.exception.bad_request;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.BAD_CONSTANT;

public class BadConstantException extends AbstractAppException {
    public BadConstantException() {
        super(BAD_CONSTANT);
    }
}
