package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.dto.userDTO.*;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.Hashing;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Hashing hashing;
    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;

    public ResponseEntity<Map<String,Object>> getTop4Seller(){
        Pageable pageable = PageRequest.of(0,4);

        List<Tuple> sellerList = userRepository.getTopSeller(pageable);

        List<TopSellerDTO> topSellerDTO = TopSellerDTO.cnvertToDTO(sellerList);

        return responseEntityBuilder
                .createResponse(200,
                        "sellers",
                        topSellerDTO
                );
    }

    public ResponseEntity<Map<String,Object>>  getProfileInfo(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long id = Long.valueOf(authentication.getName());
        Optional<User> user = userRepository.findById(id);

        ProfileUserDTO profileUserDTO = ProfileUserDTO.ConvertToDTO(user.get());

        return responseEntityBuilder
                .createResponse(200,
                        "user",
                        profileUserDTO
                );
    }

    public ResponseEntity<Map<String,Object>> updateProfile(
            UpdateProfileUserDTO updateProfileUserDTO
    ){

        boolean isNameEmpty = updateProfileUserDTO.getName() == null || updateProfileUserDTO.getName().isEmpty();
        boolean isAboutEmpty = updateProfileUserDTO.getAbout() == null || updateProfileUserDTO.getAbout().isEmpty();

        if (isNameEmpty || isAboutEmpty){
            return responseEntityBuilder
                    .createResponse(400,
                            "message",
                            "field 'name' and 'about' can't empty"
                    );
        }

        //boolean isEmailExist = userRepository.isExistsByEmail(updateProfileUserDTO.getEmail());

//        if (isEmailExist){
//            return responseEntityBuilder
//                    .createResponse(400,
//                            "message",
//                            String.format("email %s already registered",updateProfileUserDTO.getEmail())
//                    );
//        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = Long.valueOf(authentication.getName());

        User user = userRepository.findById(id).get();

        user.setName(updateProfileUserDTO.getName());
        //user.setEmail(updateProfileUserDTO.getEmail());
        user.setAbout(updateProfileUserDTO.getAbout());

        userRepository.save(user);

        return responseEntityBuilder
                .createResponse(200,
                        "message",
                        "user profile successfully updated"
                );
    }

    public ResponseEntity<Map<String,Object>> changeImageProfile(
        UpdateImageAndBannerProfileDTO updateImageAndBannerProfileDTO
    ){
        if(updateImageAndBannerProfileDTO.getImage() == null || updateImageAndBannerProfileDTO.getImage() == ""){
            return responseEntityBuilder.createResponse(
                    400,
                    "error",
                    "image link can't empty"
            );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = Long.valueOf(authentication.getName());

        User user = userRepository.findById(id).get();
        user.setImage(updateImageAndBannerProfileDTO.getImage());

        userRepository.save(user);

        return responseEntityBuilder.createResponse(
                200,
                "message",
                "successfully update user image"
        );
    }

    public ResponseEntity<Map<String,Object>> deleteBannerProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = Long.valueOf(authentication.getName());

        User user = userRepository.findById(id).get();
        user.setBanner(null);

        userRepository.save(user);

        return responseEntityBuilder.createResponse(
                200,
                "message",
                "successfully delete user banner"
        );
    }

    public ResponseEntity<Map<String,Object>> changeBannerProfile(
            UpdateImageAndBannerProfileDTO updateImageAndBannerProfileDTO
    ){
        if(updateImageAndBannerProfileDTO.getImage() == null || updateImageAndBannerProfileDTO.getImage() == ""){
            return responseEntityBuilder.createResponse(
                    400,
                    "error",
                    "image link can't empty"
            );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = Long.valueOf(authentication.getName());

        User user = userRepository.findById(id).get();
        user.setBanner(updateImageAndBannerProfileDTO.getImage());

        userRepository.save(user);

        return responseEntityBuilder.createResponse(
                200,
                "message",
                "successfully update user banner"
        );
    }

    public ResponseEntity<Map<String,Object>> changePassword(
            ChangePasswordUserDTO changePasswordUserDTO
    ){

        boolean isPasswordEmpty = changePasswordUserDTO.getPassword() == null || changePasswordUserDTO.getPassword().isEmpty();
        boolean isConfirmPasswordEmpty = changePasswordUserDTO.getConfirmPassword() == null || changePasswordUserDTO.getConfirmPassword().isEmpty();

        if (isPasswordEmpty || isConfirmPasswordEmpty){
            return responseEntityBuilder
            .createResponse(400,
                    "message",
                    "missing field 'password' and 'confirmPassword'"
            );
        }

        boolean isPasswordAndConfirmPasswordEqual = changePasswordUserDTO.getPassword().equals(changePasswordUserDTO.getConfirmPassword());

        if (!isPasswordAndConfirmPasswordEqual){
            return responseEntityBuilder
                    .createResponse(400,
                            "message",
                            "password and confirmPassword are not match"
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = Long.valueOf(authentication.getName());

        Optional<User> user = userRepository.findById(id);
        user.get().setPassword(hashing.getHash(changePasswordUserDTO.getPassword()));
        userRepository.save(user.get());

        return responseEntityBuilder
                .createResponse(200,
                        "message",
                        "password successfully changes"
                );
    }

    public ResponseEntity<Map<String,Object>> deleteUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = Long.valueOf(authentication.getName());

        Optional<User> user = userRepository.findById(id);

        userRepository.delete(user.get());

        return responseEntityBuilder
                .createResponse(200,
                        "message",
                        String.format("user with id %d successfully deleted",id)
                );
    }
}
