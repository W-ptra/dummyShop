package com.dummyShop.dummyShop.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Hashing {

    private static final int SALT_ROUND = 10;
    private final BCryptPasswordEncoder PASSWORD_ENCODER;

    public Hashing(){
        this.PASSWORD_ENCODER = new BCryptPasswordEncoder(SALT_ROUND);
    }

    public String getHash(String plainPassword){
        return PASSWORD_ENCODER.encode(plainPassword);
    }

    public Boolean compareHash(String plainPassword,String hashedPassword){
        return PASSWORD_ENCODER.matches(plainPassword,hashedPassword);
    }
}
