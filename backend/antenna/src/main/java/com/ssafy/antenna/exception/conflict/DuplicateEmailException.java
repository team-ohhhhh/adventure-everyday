package com.ssafy.antenna.exception.conflict;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_EMAIL;

public class DuplicateEmailException extends AbstractAppException {
    public DuplicateEmailException() {
        super(DUPLICATED_EMAIL);
    }
}
