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

        if (isNameEmpty || isEmailEmpty || isRoleEmpty || isPasswordEmpty)
            return responseEntityBuilder.BadRequest("field name, email, role and password can't empty");


        boolean isRoleNotBuyer = !registerUserDTO.getRole().equalsIgnoreCase("buyer");
        boolean isRoleNotSeller = !registerUserDTO.getRole().equalsIgnoreCase("seller");

        if (isRoleNotBuyer && isRoleNotSeller)
            return responseEntityBuilder.BadRequest("role must be either seller or buyer");


        boolean isEmailExist = userRepository.isExistsByEmail(registerUserDTO.getEmail());

        if (isEmailExist)
            return responseEntityBuilder.Conflict(
                    String.format("email %s already registered",registerUserDTO.getEmail())
            );


        User newUser = RegisterUserDTO.ConvertToModel(registerUserDTO);
        String hashedPassword = hashing.getHash(newUser.getPassword());
        newUser.setPassword(hashedPassword);
        Long newUserid = userRepository.save(newUser).getId();

        return responseEntityBuilder.OK(
                String.format("successfully create new user with id: %d",newUserid)
        );
    }

    public ResponseEntity<Map<String,Object>> login(
            LoginUserDTO loginUserDTO
    ){
        Optional<User> user = userRepository.findByEmail(loginUserDTO.getEmail());
        boolean isUserEmpty = user.isEmpty();

        if (isUserEmpty)
            return responseEntityBuilder.NotFound(
                    String.format("user with email %s is not found",loginUserDTO.getEmail())
            );


        boolean isPasswordNotMatch = !hashing.compareHash(
                loginUserDTO.getPassword(),
                user.get().getPassword()
        );

        if (isPasswordNotMatch)
            return responseEntityBuilder.UnAuthorized("password incorrect");


        String token = jwt.generateToken(
                user.get().getId(),
                user.get().getRole()
        );
        SuccessLoginDTO successLoginDTO = SuccessLoginDTO.convertToDTO(
                token,
                user.get()
        );

        return responseEntityBuilder.OK(successLoginDTO);
    }
}
