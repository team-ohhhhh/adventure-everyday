package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_NOT_FOUND;

public class AdventureNotFoundException extends AbstractAppException {
    public AdventureNotFoundException() {
        super(ADVENTURE_NOT_FOUND);
    }
}
