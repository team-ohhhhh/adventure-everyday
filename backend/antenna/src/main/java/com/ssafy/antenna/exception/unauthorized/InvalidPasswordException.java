package com.ssafy.antenna.exception.unauthorized;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.INVALID_PASSWORD;

public class InvalidPasswordException extends AbstractAppException {
    public InvalidPasswordException() {
        super(INVALID_PASSWORD);
    }
}
