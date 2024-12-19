package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.dto.userDTO.ChangePasswordUserDTO;
import com.dummyShop.dummyShop.dto.userDTO.ProfileUserDTO;
import com.dummyShop.dummyShop.dto.userDTO.UpdateProfileUserDTO;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.Hashing;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    public ResponseEntity<Map<String,Object>>  getProfileInfo(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long id = Long.valueOf(authentication.getName());
        Optional<User> user = userRepository.findById(id);

        ProfileUserDTO profileUserDTO = ProfileUserDTO.ConvertToDTO(user.get());

        return responseEntityBuilder
                .createResponse(200,
                        "message",
                        profileUserDTO
                );
    }

    public ResponseEntity<Map<String,Object>> updateProfile(
            UpdateProfileUserDTO updateProfileUserDTO
    ){

        boolean isNameEmpty = updateProfileUserDTO.getName() == null || updateProfileUserDTO.getName().isEmpty();
        boolean isEmailEmpty = updateProfileUserDTO.getEmail() == null || updateProfileUserDTO.getEmail().isEmpty();

        if (isNameEmpty || isEmailEmpty){
            return responseEntityBuilder
                    .createResponse(400,
                            "message",
                            "field 'name' and 'email' can't empty"
                    );
        }

        boolean isEmailExist = userRepository.isExistsByEmail(updateProfileUserDTO.getEmail());

        if (isEmailExist){
            return responseEntityBuilder
                    .createResponse(400,
                            "message",
                            String.format("email %s already registered",updateProfileUserDTO.getEmail())
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = Long.valueOf(authentication.getName());

        User user = userRepository.findById(id).get();

        user.setName(updateProfileUserDTO.getName());
        user.setEmail(updateProfileUserDTO.getEmail());

        userRepository.save(user);

        return responseEntityBuilder
                .createResponse(200,
                        "message",
                        "user profile successfully updated"
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
