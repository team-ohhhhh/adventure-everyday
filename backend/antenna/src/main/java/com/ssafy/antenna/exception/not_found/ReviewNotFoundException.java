package com.ssafy.antenna.exception.not_found;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.REVIEW_NOT_FOUND;

public class ReviewNotFoundException extends AbstractAppException {
    public ReviewNotFoundException() {
        super(REVIEW_NOT_FOUND);
    }
}
