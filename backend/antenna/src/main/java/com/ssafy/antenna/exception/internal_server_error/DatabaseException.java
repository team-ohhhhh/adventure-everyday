package com.ssafy.antenna.exception.internal_server_error;


import com.ssafy.antenna.exception.AbstractAppException;

import static com.ssafy.antenna.exception.ErrorCode.DATABASE_ERROR;

public class DatabaseException extends AbstractAppException {
    public DatabaseException() {
        super(DATABASE_ERROR);
    }
}
