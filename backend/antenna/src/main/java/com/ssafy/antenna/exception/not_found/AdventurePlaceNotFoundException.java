package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_NOT_FOUND;
import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_PLACE_NOT_FOUND;

public class AdventurePlaceNotFoundException extends AbstractAppException {
    public AdventurePlaceNotFoundException() {
        super(ADVENTURE_PLACE_NOT_FOUND);
    }
}
