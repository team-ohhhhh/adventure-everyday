package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.CERTIFICATION_SEND_NOT_FOUND;

public class CertificationSendNotFoundException extends AbstractAppException {
    public CertificationSendNotFoundException() {
        super(CERTIFICATION_SEND_NOT_FOUND);
    }
}
