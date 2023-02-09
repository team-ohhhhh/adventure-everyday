package com.ssafy.antenna.exception.conflict;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_ADVENTURE_PLACE;

public class DuplicateAdventurePlaceException extends AbstractAppException {
    public DuplicateAdventurePlaceException() {
        super(DUPLICATED_ADVENTURE_PLACE);
    }
}
