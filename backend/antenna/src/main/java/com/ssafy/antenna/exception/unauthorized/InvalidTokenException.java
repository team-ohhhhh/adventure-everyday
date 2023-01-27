package com.ssafy.antenna.exception.unauthorized;

import static com.ssafy.antenna.exception.ErrorCode.INVALID_TOKEN;
import com.ssafy.antenna.exception.AbstractAppException;

public class InvalidTokenException extends AbstractAppException {
    public InvalidTokenException() {
        super(INVALID_TOKEN);
    }
}
