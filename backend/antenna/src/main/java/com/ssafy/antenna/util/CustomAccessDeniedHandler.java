package com.ssafy.antenna.util;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        JSONObject responseJson = new JSONObject();  // result랑 resultCode 들어가는 json
        JSONObject result = new JSONObject(); // result안에 errorCode랑 message 들어가는 json

        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INVALID_PERMISSION, "인증되지 않은 사용자입니다.");
        ResultResponse resultResponse = new ResultResponse("ERROR", result);
        try {
            result.put("errorCode", errorResponse.getErrorCode());
            result.put("message", errorResponse.getMessage());

            responseJson.put("resultCode", resultResponse.getResultCode());
            responseJson.put("result", resultResponse.getResult());

            response.getWriter().println("{ \"resultCode\" : \"" + responseJson.get("resultCode")
                    + "\", \"result\" : " + responseJson.get("result") + "}");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}

