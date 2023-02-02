package com.ssafy.antenna.exception.unauthorized;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.INVALID_TOKEN;

public class InvalidTokenException extends AbstractAppException {
    public InvalidTokenException() {
        super(INVALID_TOKEN);
    }
}
