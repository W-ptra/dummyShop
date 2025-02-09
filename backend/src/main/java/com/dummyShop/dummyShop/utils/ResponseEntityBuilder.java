package com.dummyShop.dummyShop.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ResponseEntityBuilder {

    public ResponseEntity<Map<String,Object>> OK(Object message){
        return this.createResponse(
                200,
                "message",
                message
        );
    }

    public ResponseEntity<Map<String,Object>> BadRequest(Object message){
        return this.createResponse(
                400,
                "error",
                message
        );
    }

    public ResponseEntity<Map<String,Object>> UnAuthorized(Object message){
        return this.createResponse(
                401,
                "error",
                message
        );
    }

    public ResponseEntity<Map<String,Object>> NotFound(Object message){
        return this.createResponse(
                404,
                "error",
                message
        );
    }

    public ResponseEntity<Map<String,Object>> Conflict(Object message){
        return this.createResponse(
                409,
                "error",
                message
        );
    }

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
