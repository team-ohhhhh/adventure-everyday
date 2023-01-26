package com.ssafy.antenna.exception.not_found;


import static com.ssafy.antenna.exception.ErrorCode.FOLLOW_NOT_FOUND;
import com.ssafy.antenna.exception.AbstractAppException;

public class FollowNotFoundException extends AbstractAppException {
    public FollowNotFoundException() {
        super(FOLLOW_NOT_FOUND);
    }
}
