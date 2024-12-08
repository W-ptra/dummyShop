package com.dummyShop.dummyShop.configuration;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWTConfig {
    @Value("${jwt.secret-key}")
    private String secretKey;
    @Value("${jwt.expiration-time-minutes}")
    private Long expirationTime; // in minutes

    @PostConstruct
    public void init(){
        this.expirationTime = expirationTime * 60 * 1000; // minutes to milliseconds
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public Long getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Long expirationTime) {
        this.expirationTime = expirationTime;
    }
}
