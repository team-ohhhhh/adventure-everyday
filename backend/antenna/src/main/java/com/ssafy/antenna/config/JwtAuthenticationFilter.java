package com.ssafy.antenna.config;

import com.ssafy.antenna.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);
            // todo extract userEmail from JWT token
            // not authenticated yet
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (UnsupportedJwtException e) {
//            log.error("예상하는 형식과 다른 형식이거나 구성의 JWT일 때");
            request.setAttribute("exception", "INVALID_TOKEN");
            filterChain.doFilter(request, response);
        } catch (MalformedJwtException e) {
//            log.error("JWT가 올바르게 구성되지 않았을 때");
            request.setAttribute("exception", "INVALID_TOKEN");
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
//            log.error("JWT를 생성할 때 지정한 유효기간이 초과되었을 때");
            System.out.println("토큰 만료");
            request.setAttribute("exception", "EXPIRED_TOKEN");
            filterChain.doFilter(request, response);
        } catch (SignatureException e) {
//            log.error("JWT의 기존 서명을 확인하지 못했을 때");
            request.setAttribute("exception", "INVALID_TOKEN");
            filterChain.doFilter(request, response);
        } catch (IllegalArgumentException e) {
//            log.error("잘못 된 파라미터(인자)가 넘어갔을 때");
            request.setAttribute("exception", "INVALID_TOKEN");
            filterChain.doFilter(request, response);
        }

    }
}
