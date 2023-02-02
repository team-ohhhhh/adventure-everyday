package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_IN_PROGRESS_NOT_FOUND;

public class AdventureInProgressNotFoundException extends AbstractAppException {
    public AdventureInProgressNotFoundException() {
        super(ADVENTURE_IN_PROGRESS_NOT_FOUND);
    }
}
