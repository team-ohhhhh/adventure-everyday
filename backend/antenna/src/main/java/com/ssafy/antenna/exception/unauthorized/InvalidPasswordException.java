package com.ssafy.antenna.exception.unauthorized;


import static com.ssafy.antenna.exception.ErrorCode.INVALID_PASSWORD;
import com.ssafy.antenna.exception.AbstractAppException;

public class InvalidPasswordException extends AbstractAppException {
    public InvalidPasswordException() {
        super(INVALID_PASSWORD);
    }
}
