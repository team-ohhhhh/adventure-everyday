package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ANTENNA_NOT_FOUND;

public class AntennaNotFoundException extends AbstractAppException {
    public AntennaNotFoundException() {
        super(ANTENNA_NOT_FOUND);
    }
}
