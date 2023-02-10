package com.ssafy.antenna.exception.conflict;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_ADVENTURE_LIKE;
import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_ADVENTURE_PLACE;

public class DuplicateAdventureLikeException extends AbstractAppException {
    public DuplicateAdventureLikeException() {
        super(DUPLICATED_ADVENTURE_LIKE);
    }
}
