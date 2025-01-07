package com.dummyShop.dummyShop.middleware;

import com.dummyShop.dummyShop.utils.JWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import reactor.util.annotation.NonNull;

import java.io.IOException;

@Component
public class JWTAuthenticationMiddleware extends OncePerRequestFilter {

    @Autowired
    private JWT jwt;
    @Autowired
    private ApplicationContext context;

    @Override
    protected boolean shouldNotFilter(
            HttpServletRequest request
    ){
        String path = request.getRequestURI();
        String method = request.getMethod();

        if ( path.matches("/api/auth/.*") && method.equals("POST")){
            return true;
        }

        if ((path.equals("/api/product") || path.matches("/api/product/.*")) && method.equals("GET")){
            return  true;
        }

        if (path.equals("/api/tag") && method.equals("GET")){
            return  true;
        }

        return false;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")){
            setErrorResponse(response, 401, "Missing or invalid Authorization header");
            return;
        }

        String token = header.substring(7);

        try{

            if(!jwt.isTokenValid(token)){
                setErrorResponse(response, 401, "jwt token is invalid");
                return;
            }

            String id = String.valueOf(jwt.getId(token));
            String role = jwt.getRole(token);

            UserDetails userDetails = User.builder()
                    .username(id)
                    .password("")
                    .roles(role.toUpperCase())
                    .build();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }
        catch (Exception e){
            setErrorResponse(response, 401, "jwt token is expired");
            return;
        }

        filterChain.doFilter(request,response);
    }

    private void setErrorResponse(
            HttpServletResponse response,
            int statusCode,
            String message
    ) throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }
}
