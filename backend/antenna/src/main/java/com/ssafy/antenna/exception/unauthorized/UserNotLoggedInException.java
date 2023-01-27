package com.ssafy.antenna.exception.unauthorized;

import static com.ssafy.antenna.exception.ErrorCode.USER_NOT_LOGGED_IN;
import com.ssafy.antenna.exception.AbstractAppException;

public class UserNotLoggedInException extends AbstractAppException {
    public UserNotLoggedInException() {
        super(USER_NOT_LOGGED_IN);
    }
}
