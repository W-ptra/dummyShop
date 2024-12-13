package com.dummyShop.dummyShop.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWT {
        @Value("${jwt.secret-key}")
        private String secretKey;

        @Value("${jwt.expiration-time-minutes}")
        private Long expirationTime;

        @PostConstruct
        public void init(){
                this.expirationTime = expirationTime * 60 * 1000; // minutes to milliseconds
        }

        private Key getSignKey(){
                return Keys.hmacShaKeyFor(this.secretKey.getBytes());
        }

        public String generateToken(Long id, String role){
                Map<String,Object> claims = new HashMap<>();
                claims.put("role",role);

                return Jwts.builder()
                        .setClaims(claims)
                        .setSubject(String.valueOf(id))
                        .setIssuedAt(new Date(System.currentTimeMillis()))
                        .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                        .signWith(getSignKey())
                        .compact();
        }

        private Claims extractAllClaims(String token){
                return Jwts.parserBuilder()
                        .setSigningKey(getSignKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
        }

        private <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
                Claims claims = extractAllClaims(token);
                return claimsResolver.apply(claims);
        }

        public boolean isTokenValid(String token){
                try{
                        Claims claims = extractAllClaims(token);
                        return  claims.getExpiration().after(new Date(System.currentTimeMillis()));
                } catch (Exception e){
                        return  false;
                }
        }

        public Long getId(String token){
                return Long.valueOf(extractClaim(token, Claims::getSubject));
        }

        public String getRole(String token){
                return extractClaim(token, claims -> claims.get("role",String.class));
        }
}
