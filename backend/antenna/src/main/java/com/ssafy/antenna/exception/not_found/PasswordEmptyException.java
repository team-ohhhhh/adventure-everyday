package com.ssafy.antenna.exception.not_found;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.NICKNAME_EMPTY;
import static com.ssafy.antenna.exception.ErrorCode.PASSWORD_EMPTY;

public class PasswordEmptyException extends AbstractAppException {
    public PasswordEmptyException() {
        super(PASSWORD_EMPTY);
    }
}
