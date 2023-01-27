package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.FOLLOW_NOT_FOUND;

public class FollowNotFoundException extends AbstractAppException {
    public FollowNotFoundException() {
        super(FOLLOW_NOT_FOUND);
    }
}
