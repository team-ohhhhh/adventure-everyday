package com.ssafy.antenna.exception.not_found;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.NICKNAME_EMPTY;

public class NicknameEmptyException extends AbstractAppException {
    public NicknameEmptyException() {
        super(NICKNAME_EMPTY);
    }
}
