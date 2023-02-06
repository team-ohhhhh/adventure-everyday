package com.ssafy.antenna.domain;

import com.ssafy.antenna.exception.ErrorCode;
import lombok.Getter;

@Getter
public class ErrorResponse {
    private final String errorCode;
    private final String message;

    public ErrorResponse(ErrorCode errorCode) {
        this.errorCode = errorCode.name();
        this.message = errorCode.getMessage();
    }

    public ErrorResponse(ErrorCode errorCode, String msg) {
        this.errorCode = errorCode.name();
        this.message = msg;
    }

    public static ErrorResponse of(ErrorCode errorCode) {
        return new ErrorResponse(errorCode);
    }
}
