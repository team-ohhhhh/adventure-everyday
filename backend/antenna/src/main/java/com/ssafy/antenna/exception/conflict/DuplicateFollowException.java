package com.ssafy.antenna.exception.conflict;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_FOLLOW;

public class DuplicateFollowException extends AbstractAppException {
    public DuplicateFollowException() {
        super(DUPLICATED_FOLLOW);
    }
}
