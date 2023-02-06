package com.ssafy.antenna.config;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;


@Component
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	private final HandlerExceptionResolver handlerExceptionResolver;
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
		String exception = (String) request.getAttribute("exception");
		log.info(exception);

		if (exception == null) {
			try {
				setResponse(response, ErrorCode.INVALID_TOKEN, "토큰이 존재하지 않습니다.");
			} catch (JSONException e) {
				throw new RuntimeException(e);
			}
		}
		//잘못된 타입의 토큰인 경우
		else if (exception.equals("INVALID_TOKEN")) {
			try {
				setResponse(response, ErrorCode.INVALID_TOKEN, "잘못된 토큰입니다.");
			} catch (JSONException e) {
				throw new RuntimeException(e);
			}
		} else if (exception.equals("EXPIRED_TOKEN")) {
			try {
				setResponse(response, ErrorCode.EXPIRED_TOKEN, "만료된 토큰입니다.");
			} catch (JSONException e) {
				throw new RuntimeException(e);
			}
		} else {
			try {
				setResponse(response, ErrorCode.INVALID_PERMISSION, "");
			} catch (JSONException e) {
				throw new RuntimeException(e);
			}
		}
	}
	private void setResponse(HttpServletResponse response, ErrorCode e, String message) throws IOException, JSONException {
		response.setContentType("application/json;charset=UTF-8");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

		JSONObject responseJson = new JSONObject();  // result랑 resultCode 들어가는 json
		JSONObject result = new JSONObject(); // result안에 errorCode랑 message 들어가는 json

		ErrorResponse errorResponse = new ErrorResponse(e, message);
		result.put("errorCode", errorResponse.getErrorCode());
		result.put("message", message);

		ResultResponse resultResponse = new ResultResponse("ERROR", result);

		responseJson.put("resultCode", resultResponse.getResultCode());
		responseJson.put("result", resultResponse.getResult());

		response.getWriter().println("{ \"resultCode\" : \"" + responseJson.get("resultCode")
				+ "\", \"result\" : " + responseJson.get("result") + "}");
	}

//	@Override
//	public void commence(
//			HttpServletRequest request,
//			HttpServletResponse response,
//			AuthenticationException authException
//	) throws IOException, ServletException {
//		handlerExceptionResolver.resolveException(request, response, null, authException);
//	}
}
