package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_SUCCEED_NOT_FOUND;

public class AdventureSucceedNotFoundException extends AbstractAppException {
    public AdventureSucceedNotFoundException() {
        super(ADVENTURE_SUCCEED_NOT_FOUND);
    }
}
