package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.FOLLOWING_NOT_FOUND;

public class FollowingNotFoundException extends AbstractAppException {
    public FollowingNotFoundException() {
        super(FOLLOWING_NOT_FOUND);
    }
}
