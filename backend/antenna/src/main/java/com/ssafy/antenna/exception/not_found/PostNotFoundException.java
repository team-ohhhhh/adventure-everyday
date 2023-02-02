package com.ssafy.antenna.exception.not_found;


import static com.ssafy.antenna.exception.ErrorCode.USER_NOT_FOUND;
import com.ssafy.antenna.exception.AbstractAppException;

public class UserNotFoundException extends AbstractAppException {
    public UserNotFoundException() {
        super(USER_NOT_FOUND);
    }
}
