package com.ssafy.antenna.exception.unauthorized;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.INVALID_REFRESH_TOKEN;
import static com.ssafy.antenna.exception.ErrorCode.INVALID_TOKEN;

public class InvalidRefreshTokenException extends AbstractAppException {
    public InvalidRefreshTokenException() {
        super(INVALID_REFRESH_TOKEN);
    }
}
