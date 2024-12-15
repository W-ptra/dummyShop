package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.dto.userDTO.ChangePasswordUserDTO;
import com.dummyShop.dummyShop.dto.userDTO.UpdateProfileUserDTO;
import com.dummyShop.dummyShop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<Map<String,Object>> getUserProfile(){
        return userService.getProfileInfo();
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String,Object>>
        updateUserProfile(@RequestBody UpdateProfileUserDTO updateProfileUserDTO){

        return userService.updateProfile(updateProfileUserDTO);
    }

    @PutMapping("/change-password")
    public ResponseEntity<Map<String,Object>>
        changeUserPassword(@RequestBody ChangePasswordUserDTO changePasswordUserDTO){

        return userService.changePassword(changePasswordUserDTO);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String,Object>> deleteUser(){
        return userService.deleteUser();
    }
}
