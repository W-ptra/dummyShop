package com.dummyShop.dummyShop.utils;

import com.dummyShop.dummyShop.configuration.JWTConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JWT {

        @Autowired
        private JWTConfig jwtConfig;

        public String generateToken(Long id,String role){
                Date now = new Date();
                Date expiryDate = new Date(now.getTime() + jwtConfig.getExpirationTime());
                Key key = Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
                return Jwts.builder()
                        .setSubject(String.valueOf(id))
                        .claim("role",role)
                        .setIssuedAt(now)
                        .setExpiration(expiryDate)
                        .signWith(key)
                        .compact();
        }

        public Claims getClaims(String token){
                Key key = Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
                return Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJwt(token)
                        .getBody();
        }

        public Long getUserId(String token){
                Claims claims = getClaims(token);
                return Long.valueOf(claims.getSubject());
        }

        public String getUserRole(String token){
                Claims claims = getClaims(token);
                return claims.get("role",String.class);
        }
}
