package com.ssafy.antenna.exception.bad_request;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.FOLLOW_NOT_ME;

public class FollowNotMeException extends AbstractAppException {
    public FollowNotMeException() {
        super(FOLLOW_NOT_ME);
    }
}
