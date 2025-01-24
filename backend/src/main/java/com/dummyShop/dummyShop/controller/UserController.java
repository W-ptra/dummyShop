package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.dto.userDTO.ChangePasswordUserDTO;
import com.dummyShop.dummyShop.dto.userDTO.UpdateImageAndBannerProfileDTO;
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

    @GetMapping("/top-sellers")
    public ResponseEntity<Map<String,Object>> getTop4Seller(){
        return userService.getTop4Seller();
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String,Object>> updateUserProfile(
            @RequestBody UpdateProfileUserDTO updateProfileUserDTO
    ){

        return userService.updateProfile(updateProfileUserDTO);
    }

    @PutMapping("/image")
    public ResponseEntity<Map<String,Object>> changeUserImageProfile(
            @RequestBody UpdateImageAndBannerProfileDTO updateImageAndBannerProfileDTO
    ){
        return userService.changeImageProfile(updateImageAndBannerProfileDTO);
    }

    @PutMapping("/banner")
    public ResponseEntity<Map<String,Object>> changeUserBannerProfile(
            @RequestBody UpdateImageAndBannerProfileDTO updateImageAndBannerProfileDTO
    ){
        return userService.changeBannerProfile(updateImageAndBannerProfileDTO);
    }

    @PutMapping("/change-password")
    public ResponseEntity<Map<String,Object>> changeUserPassword(
            @RequestBody ChangePasswordUserDTO changePasswordUserDTO
    ){
        return userService.changePassword(changePasswordUserDTO);
    }

    @DeleteMapping("/banner")
    public ResponseEntity<Map<String,Object>> deleteUserBannerProfile(){
        return userService.deleteBannerProfile();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String,Object>> deleteUser(){
        return userService.deleteUser();
    }
}
