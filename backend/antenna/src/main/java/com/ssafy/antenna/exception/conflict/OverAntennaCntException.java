package com.ssafy.antenna.exception.conflict;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.OVER_ANTENNA_CNT;

public class OverAntennaCntException extends AbstractAppException {
    public OverAntennaCntException() {
        super(OVER_ANTENNA_CNT);
    }
}
