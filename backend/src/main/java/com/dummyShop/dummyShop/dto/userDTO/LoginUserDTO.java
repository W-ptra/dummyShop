package com.dummyShop.dummyShop.dto.userDTO;

import com.dummyShop.dummyShop.model.User;

public class LoginUserDTO {
    private String email;
    private String password;

    public  LoginUserDTO(){}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public static LoginUserDTO ConvertToDTO(User user){
        LoginUserDTO loginUserDTO = new LoginUserDTO();
        loginUserDTO.setEmail(user.getEmail());
        loginUserDTO.setPassword(user.getPassword());

        return loginUserDTO;
    }

    public static User ConvertToModel(LoginUserDTO loginUserDTO){
        User user = new User();
        user.setEmail(loginUserDTO.getEmail());
        user.setPassword(loginUserDTO.getPassword());
        return user;
    }
}
