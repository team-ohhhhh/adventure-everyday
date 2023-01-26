package com.ssafy.antenna.exception.forbidden;

import com.ssafy.antenna.exception.AbstractAppException;
import static com.ssafy.antenna.exception.ErrorCode.INVALID_PERMISSION;


public class InvalidPermissionException extends AbstractAppException {
    public InvalidPermissionException() {
        super(INVALID_PERMISSION);
    }
}
