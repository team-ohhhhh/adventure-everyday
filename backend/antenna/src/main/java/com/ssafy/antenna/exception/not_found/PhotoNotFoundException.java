package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.PHOTO_NOT_FOUND;

public class PhotoNotFoundException extends AbstractAppException {
    public PhotoNotFoundException() {
        super(PHOTO_NOT_FOUND);
    }
}
