package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.dto.AuthDTO.LoginUserDTO;
import com.dummyShop.dummyShop.dto.AuthDTO.RegisterUserDTO;
import com.dummyShop.dummyShop.dto.AuthDTO.SuccessLoginDTO;
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
    private ResponseEntityBuilder responseEntityBuilder;
    @Autowired
    private JWT jwt;

    public ResponseEntity<Map<String,Object>> register(
            RegisterUserDTO registerUserDTO
    ){

        boolean isNameEmpty = registerUserDTO.getName().isEmpty();
        boolean isEmailEmpty = registerUserDTO.getEmail().isEmpty();
        boolean isRoleEmpty = registerUserDTO.getRole().isEmpty();
        boolean isPasswordEmpty = registerUserDTO.getPassword().isEmpty();

        if (isNameEmpty || isEmailEmpty || isRoleEmpty || isPasswordEmpty){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "error",
                            "field 'name', 'email', 'role' and 'password' can't empty"
                    );
        }

        boolean isRoleBuyer = registerUserDTO.getRole().equalsIgnoreCase("buyer");
        boolean isRoleSeller = registerUserDTO.getRole().equalsIgnoreCase("seller");

        if (!isRoleBuyer && !isRoleSeller){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "error",
                            "role must be either 'seller' or 'buyer'"
                    );
        }

        boolean isEmailExist = userRepository.isExistsByEmail(registerUserDTO.getEmail());

        if (isEmailExist){
            return responseEntityBuilder
                    .createResponse(
                            409,
                            "error",
                            String.format("email %s already registered",registerUserDTO.getEmail())
                    );
        }

        User user = RegisterUserDTO.ConvertToModel(registerUserDTO);
        user.setPassword(hashing.getHash(user.getPassword()));
        Long id = userRepository.save(user).getId();
        return responseEntityBuilder
                .createResponse(
                        200,
                        "message",
                        String.format("successfully create new user with id: %d",id)
                );
    }

    public ResponseEntity<Map<String,Object>> login(
            LoginUserDTO loginUserDTO
    ){
        Optional<User> user = userRepository.findByEmail(loginUserDTO.getEmail());
        if (user.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "error",
                            String.format("user with email %s is not found",loginUserDTO.getEmail())
                    );
        }

        if (!hashing.compareHash(loginUserDTO.getPassword(),user.get().getPassword())){
            return responseEntityBuilder
                    .createResponse(
                            401,
                            "error",
                            "password incorrect"
                    );
        }

        String token = jwt.generateToken(
                user.get().getId(),
                user.get().getRole()
        );

        SuccessLoginDTO successLoginDTO = SuccessLoginDTO.convertToDTO(
                token,
                user.get()
        );

        return responseEntityBuilder
                .createResponse(
                        200,
                        "success",
                        successLoginDTO
                );
    }
}
