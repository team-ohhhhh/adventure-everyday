package com.ssafy.antenna.exception.conflict;

import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_FOLLOW;
import com.ssafy.antenna.exception.AbstractAppException;

public class DuplicateFollowException extends AbstractAppException {
    public DuplicateFollowException() {
        super(DUPLICATED_FOLLOW);
    }
}
