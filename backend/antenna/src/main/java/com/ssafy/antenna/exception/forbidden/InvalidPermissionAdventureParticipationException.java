package com.ssafy.antenna.exception.forbidden;

import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.INVALID_PERMISSION_ADVENTURE_PARTICIPATION;


public class InvalidPermissionAdventureParticipationException extends AbstractAppException {
    public InvalidPermissionAdventureParticipationException() {
        super(INVALID_PERMISSION_ADVENTURE_PARTICIPATION);
    }
}
