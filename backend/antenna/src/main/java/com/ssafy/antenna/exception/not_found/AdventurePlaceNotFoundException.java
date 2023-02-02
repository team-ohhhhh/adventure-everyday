package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_NOT_FOUND;

public class AdventurePlaceNotFoundException extends AbstractAppException {
    public AdventurePlaceNotFoundException() {
        super(ADVENTURE_NOT_FOUND);
    }
}
