package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.dto.userDTO.LoginUserDTO;
import com.dummyShop.dummyShop.dto.userDTO.RegisterUserDTO;
import com.dummyShop.dummyShop.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:7000/")
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:7000/")
    public ResponseEntity<Map<String,Object>> register(
            @RequestBody RegisterUserDTO registerUserDTO
    ){
        return authService.register(registerUserDTO);
    }

    @PostMapping("/login")
    @CrossOrigin( origins = "http://localhost:7000/")
    public ResponseEntity<Map<String,Object>> register(
            @RequestBody LoginUserDTO loginUserDTO
    ){
        return  authService.login(loginUserDTO);
    }
}
