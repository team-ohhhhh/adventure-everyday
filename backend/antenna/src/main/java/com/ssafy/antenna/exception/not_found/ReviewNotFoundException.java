package com.ssafy.antenna.exception.not_found;

import static com.ssafy.antenna.exception.ErrorCode.REVIEW_NOT_FOUND;
import com.ssafy.antenna.exception.AbstractAppException;

public class ReviewNotFoundException extends AbstractAppException {
    public ReviewNotFoundException() {
        super(REVIEW_NOT_FOUND);
    }
}
