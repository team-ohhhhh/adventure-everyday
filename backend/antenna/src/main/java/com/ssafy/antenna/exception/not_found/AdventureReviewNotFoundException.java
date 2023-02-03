package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_REVIEW_NOT_FOUND;

public class AdventureReviewNotFoundException extends AbstractAppException {
    public AdventureReviewNotFoundException() {
        super(ADVENTURE_REVIEW_NOT_FOUND);
    }
}
