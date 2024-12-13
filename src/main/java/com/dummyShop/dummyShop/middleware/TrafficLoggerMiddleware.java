package com.dummyShop.dummyShop.middleware;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import reactor.util.annotation.NonNull;

import java.io.IOException;

@Component
public class TrafficLoggerMiddleware extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(TrafficLoggerMiddleware.class);

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException
    {
        logger.info("Request: Method={}, URI={}, Headers={}",
                request.getMethod(),
                request.getRequestURI(),
                request.getHeaderNames());

        filterChain.doFilter(request, response);

        logger.info("Response: Status={}, Headers={}",
                response.getStatus(),
                response.getHeaderNames());
    }
}
