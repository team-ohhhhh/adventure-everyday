package com.ssafy.antenna.exception.not_found;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.CATEGORY_NOT_FOUND;

public class CategoryNotFoundException extends AbstractAppException {
    public CategoryNotFoundException() {
        super(CATEGORY_NOT_FOUND);
    }
}
