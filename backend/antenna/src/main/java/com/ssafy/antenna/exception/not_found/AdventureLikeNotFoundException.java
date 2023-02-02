package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.ADVENTURE_LIKE_NOT_FOUND;

public class AdventureLikeNotFoundException extends AbstractAppException {
    public AdventureLikeNotFoundException() {
        super(ADVENTURE_LIKE_NOT_FOUND);
    }
}
