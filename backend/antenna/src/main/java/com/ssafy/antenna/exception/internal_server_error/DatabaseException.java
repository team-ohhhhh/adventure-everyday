package com.ssafy.antenna.exception.internal_server_error;


import static com.ssafy.antenna.exception.ErrorCode.DATABASE_ERROR;
import com.ssafy.antenna.exception.AbstractAppException;

public class DatabaseException extends AbstractAppException {
    public DatabaseException() {
        super(DATABASE_ERROR);
    }
}
