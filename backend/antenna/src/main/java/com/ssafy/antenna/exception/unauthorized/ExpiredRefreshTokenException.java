package com.ssafy.antenna.exception.unauthorized;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.EXPIRED_REFRESH_TOKEN;

public class ExpiredRefreshTokenException extends AbstractAppException {
    public ExpiredRefreshTokenException() {
        super(EXPIRED_REFRESH_TOKEN);
    }
}
