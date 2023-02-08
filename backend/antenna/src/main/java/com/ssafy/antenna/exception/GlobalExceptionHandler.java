package com.ssafy.antenna.exception;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import jakarta.persistence.PersistenceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ssafy.antenna.exception.ErrorCode.BAD_CONSTANT;
import static com.ssafy.antenna.exception.ErrorCode.DATABASE_ERROR;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleValidationExceptions(
//            MethodArgumentNotValidException ex) {
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
//    }
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResultResponse<ErrorResponse>> handleValidationExceptions(
			MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ObjectError error = ex.getBindingResult().getAllErrors().get(ex.getBindingResult().getAllErrors().size()-1);
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//				.body(ResultResponse.error(ErrorResponse.of(BAD_CONSTANT)));
//		return ex.getBindingResult().getAllErrors().stream()
//				.map(e -> ResponseEntity.status(ex.getStatusCode())
//						.body(ResultResponse.error(ErrorResponse.of(ErrorCode.valueOf(e.getDefaultMessage())))))
//				.collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(ResultResponse.error(ErrorResponse.of(ErrorCode.valueOf(error.getDefaultMessage()))));
	}

	@ExceptionHandler(PersistenceException.class)
	public ResponseEntity<ResultResponse<ErrorResponse>> persistenceException() {
		log.error("{} {}", DATABASE_ERROR.name(), DATABASE_ERROR.getMessage());
		return ResponseEntity.status(DATABASE_ERROR.getHttpStatus())
				.body(ResultResponse.error(ErrorResponse.of(DATABASE_ERROR)));
	}

//    @ExceptionHandler({ AuthenticationException.class })
//    @ResponseBody
//    public ResponseEntity<ResultResponse<ErrorResponse>> handleAuthenticationException(AuthenticationException e) {
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                .body(ResultResponse.error(ErrorResponse.of(INVALID_TOKEN)));
//    }

	@ExceptionHandler(AbstractAppException.class)
	public ResponseEntity<ResultResponse<ErrorResponse>> abstractBaseExceptionHandler(AbstractAppException e) {
		log.error("{} {}", e.getErrorCode().name(), e.getMessage());
		return ResponseEntity.status(e.getErrorCode().getHttpStatus())
				.body(ResultResponse.error(e));
	}
}