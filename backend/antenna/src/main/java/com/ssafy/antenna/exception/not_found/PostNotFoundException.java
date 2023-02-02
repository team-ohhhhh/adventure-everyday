package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.POST_NOT_FOUND;

public class PostNotFoundException extends AbstractAppException {
    public PostNotFoundException() {
        super(POST_NOT_FOUND);
    }
}
