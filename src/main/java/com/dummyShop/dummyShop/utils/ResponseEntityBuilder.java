package com.dummyShop.dummyShop.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ResponseEntityBuilder {
    public ResponseEntity<Map<String,Object>> createResponse(
            int status,
            String message,
            Object obj
    ){
        Map<String,Object> body = new HashMap<>();
        body.put(message,obj);

        return ResponseEntity.status(status).body(body);
    }
}
