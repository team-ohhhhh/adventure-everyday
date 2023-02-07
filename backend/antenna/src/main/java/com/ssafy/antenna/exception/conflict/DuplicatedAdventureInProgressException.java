package com.ssafy.antenna.exception.conflict;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_ADVENTURE_IN_PROGRESS;

public class DuplicatedAdventureInProgressException extends AbstractAppException {
    public DuplicatedAdventureInProgressException() {
        super(DUPLICATED_ADVENTURE_IN_PROGRESS);
    }
}
