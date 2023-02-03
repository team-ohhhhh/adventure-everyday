package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_IN_PROGRESS_NOT_FOUND;

public class CheckpointPostNotFoundException extends AbstractAppException {
    public CheckpointPostNotFoundException() {
        super(ADVENTURE_IN_PROGRESS_NOT_FOUND);
    }
}
