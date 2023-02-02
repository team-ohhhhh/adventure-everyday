package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.FOLLOWER_NOT_FOUND;

public class FollowerNotFoundException extends AbstractAppException {
    public FollowerNotFoundException() {
        super(FOLLOWER_NOT_FOUND);
    }
}
