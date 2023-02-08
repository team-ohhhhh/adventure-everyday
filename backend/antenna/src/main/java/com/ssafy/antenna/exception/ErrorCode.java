package com.ssafy.antenna.exception;

import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

public enum ErrorCode {
    INVALID_PASSWORD(UNAUTHORIZED, "잘못된 패스워드입니다."),
    INVALID_TOKEN(UNAUTHORIZED, "잘못된 토큰입니다."),
    INVALID_REFRESH_TOKEN(UNAUTHORIZED, "잘못된 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(UNAUTHORIZED, "리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요."),
    EXPIRED_TOKEN(UNAUTHORIZED, "만료된 토큰입니다."),
    USER_NOT_LOGGED_IN(EXPECTATION_FAILED, "로그인이 필요합니다."),
    INVALID_PERMISSION(FORBIDDEN, "권한이 없습니다."),
    USER_NOT_FOUND(NOT_FOUND, "해당하는 유저를 찾을 수 없습니다."),
    POST_NOT_FOUND(NOT_FOUND, "해당하는 글을 찾을 수 없습니다."),
    ADVENTURE_NOT_FOUND(NOT_FOUND, "해당하는 탐험을 찾을 수 없습니다."),
    ADVENTURE_PLACE_NOT_FOUND(NOT_FOUND, "해당하는 탐험장소를 찾을 수 없습니다."),
    ADVENTURE_IN_PROGRESS_NOT_FOUND(NOT_FOUND, "해당하는 참가중인 탐험을 찾을 수 없습니다."),
    ADVENTURE_SUCCEED_NOT_FOUND(NOT_FOUND, "해당하는 완료한 탐험을 찾을 수 없습니다."),
    ADVENTURE_LIKE_NOT_FOUND(NOT_FOUND, "해당하는 탐험 알림을 찾을 수 없습니다."),
    ADVENTURE_REVIEW_NOT_FOUND(NOT_FOUND, "해당하는 탐험 리뷰를 찾을 수 없습니다."),
    CHECKPOINT_POST_NOT_FOUND(NOT_FOUND, "해당하는 체크포인트 게시글을 찾을 수 없습니다."),
    CATEGORY_NOT_FOUND(NOT_FOUND, "해당하는 카테고리를 찾을 수 없습니다."),
    PHOTO_NOT_FOUND(NOT_FOUND, "저장할 사진을 찾을 수 없습니다."),
    ANTENNA_NOT_FOUND(NOT_FOUND, "해당하는 안테나를 찾을 수 없습니다."),
    EMAIL_NOT_FOUND(NOT_FOUND, "해당하는 이메일을 찾을 수 없습니다."),
    EMAIL_EMPTY(NOT_FOUND, "이메일이 입력되지 않았습니다. 이메일 정보를 제공해주세요."),
    EMAIL_INVALID(BAD_REQUEST, "이메일 양식이 맞지않습니다."),
    NICKNAME_EMPTY(NOT_FOUND, "닉네임이 입력되지 않았습니다. 닉네임 정보를 제공해주세요."),
    PASSWORD_EMPTY(NOT_FOUND, "비밀번호가 입력되지 않았습니다. 비밀번호 정보를 제공해주세요."),
    BAD_CONSTANT(BAD_REQUEST, "잘못된 인자입니다."),
    BOOK_NOT_FOUND(NOT_FOUND, "해당하는 책 정보를 찾을 수 없습니다."),
    REVIEW_NOT_FOUND(NOT_FOUND, "해당하는 리뷰를 찾을 수 없습니다."),
    FOLLOW_NOT_FOUND(NOT_FOUND, "팔로우가 존재하지 않습니다."),
    FOLLOWER_NOT_FOUND(NOT_FOUND, "팔로잉을 시도하는 유저가 없습니다."),
    FOLLOWING_NOT_FOUND(NOT_FOUND, "팔로잉 대상인 유저가 없습니다."),
    API_REQUEST_TIMEOUT(REQUEST_TIMEOUT, "요청 시간이 초과되었습니다."),
    DUPLICATED_NICKNAME(CONFLICT, "이미 사용중인 닉네임입니다."),
    DUPLICATED_EMAIL(CONFLICT, "이미 사용중인 이메일입니다."),
    DUPLICATED_FOLLOW(CONFLICT, "이미 팔로우 중입니다."),
    DUPLICATED_ADVENTURE_IN_PROGRESS(CONFLICT, "이미 참가중인 모험입니다."),
    DUPLICATED_ADVENTURE_PLACE(CONFLICT, "이미 참가한 모험 장소입니다."),
    FOLLOW_NOT_ME(BAD_REQUEST, "나를 팔로우 할 수 없습니다."),
    DATABASE_ERROR(INTERNAL_SERVER_ERROR, "데이터베이스 에러"),
    CERTIFICATION_SEND_NOT_FOUND(NOT_FOUND, "인증 번호 전송 내역이 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }
}
