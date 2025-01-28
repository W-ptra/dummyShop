package com.dummyShop.dummyShop.dto.AuthDTO;

import com.dummyShop.dummyShop.model.User;

public class RegisterUserDTO {
    private String email;
    private String name;
    private String password;
    private String role;

    public RegisterUserDTO(){}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static RegisterUserDTO ConvertToDTO(User user){
        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        registerUserDTO.setEmail(user.getEmail());
        registerUserDTO.setName(user.getName());
        registerUserDTO.setPassword(user.getPassword());
        registerUserDTO.setRole(user.getRole());

        return registerUserDTO;
    }

    public static User ConvertToModel(RegisterUserDTO registerUserDTO){
        User user = new User();
        user.setEmail(registerUserDTO.getEmail());
        user.setName(registerUserDTO.getName());
        user.setPassword(registerUserDTO.getPassword());
        user.setRole(registerUserDTO.getRole());
        return user;
    }
}
