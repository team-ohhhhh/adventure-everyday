package com.ssafy.antenna.exception.request_timeout;

import static com.ssafy.antenna.exception.ErrorCode.API_REQUEST_TIMEOUT;
import com.ssafy.antenna.exception.AbstractAppException;

public class APIRequestTimeoutException extends AbstractAppException {
    public APIRequestTimeoutException() {
        super(API_REQUEST_TIMEOUT);
    }
}
