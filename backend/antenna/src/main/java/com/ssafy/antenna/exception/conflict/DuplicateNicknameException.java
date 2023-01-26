package com.ssafy.antenna.exception.conflict;

import com.ssafy.antenna.exception.AbstractAppException;
import static com.ssafy.antenna.exception.ErrorCode.DUPLICATED_NICKNAME;

public class DuplicateNicknameException extends AbstractAppException {
    public DuplicateNicknameException() {
        super(DUPLICATED_NICKNAME);
    }
}
