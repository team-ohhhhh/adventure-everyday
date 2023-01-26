package com.ssafy.antenna.exception.not_found;


import static com.ssafy.antenna.exception.ErrorCode.FOLLOWER_NOT_FOUND;
import com.ssafy.antenna.exception.AbstractAppException;

public class FollowerNotFoundException extends AbstractAppException {
    public FollowerNotFoundException() {
        super(FOLLOWER_NOT_FOUND);
    }
}
