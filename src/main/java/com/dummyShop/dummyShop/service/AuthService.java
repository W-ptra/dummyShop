package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.dto.userDTO.LoginUserDTO;
import com.dummyShop.dummyShop.dto.userDTO.RegisterUserDTO;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.Hashing;
import com.dummyShop.dummyShop.utils.JWT;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Hashing hashing;

    @Autowired
    private JWT jwt;

    public ResponseEntity<Map<String,Object>> register(RegisterUserDTO registerUserDTO){
        boolean isRoleBuyer = registerUserDTO.getRole().equalsIgnoreCase("buyer");
        boolean isRoleSeller = registerUserDTO.getRole().equalsIgnoreCase("seller");

        if (!isRoleBuyer && !isRoleSeller){
            return ResponseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "role must be either 'seller' or 'buyer'"
                    );
        }

        boolean isEmailExist = userRepository.isExistsByEmail(registerUserDTO.getEmail());

        if (isEmailExist){
            return ResponseEntityBuilder
                    .createResponse(
                            409,
                            "message",
                            String.format("email: %s already registered",registerUserDTO.getEmail())
                    );
        }

        User user = RegisterUserDTO.ConvertToModel(registerUserDTO);
        user.setPassword(hashing.getHash(user.getPassword()));
        Long id = userRepository.save(user).getId();
        return ResponseEntityBuilder
                .createResponse(
                        200,
                        "message",
                        String.format("successfully create new user with id: %d",id)
                );
    }

    public ResponseEntity<Map<String,Object>> login(LoginUserDTO loginUserDTO){
        Optional<User> user = userRepository.findByEmail(loginUserDTO.getEmail());
        if (user.isEmpty()){
            return ResponseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            String.format("user with email %s is not found",loginUserDTO.getEmail())
                    );
        }

        if (!hashing.compareHash(loginUserDTO.getPassword(),user.get().getPassword())){
            return ResponseEntityBuilder
                    .createResponse(
                            401,
                            "message",
                            "password incorrect"
                    );
        }

        String token = jwt.generateToken(user.get().getId(),user.get().getRole());

        return ResponseEntityBuilder
                .createResponse(
                        200,
                        "token",
                        token
                );
    }
}
