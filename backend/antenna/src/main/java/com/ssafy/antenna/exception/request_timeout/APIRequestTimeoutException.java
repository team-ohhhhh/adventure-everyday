package com.ssafy.antenna.exception.request_timeout;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.API_REQUEST_TIMEOUT;

public class APIRequestTimeoutException extends AbstractAppException {
    public APIRequestTimeoutException() {
        super(API_REQUEST_TIMEOUT);
    }
}
