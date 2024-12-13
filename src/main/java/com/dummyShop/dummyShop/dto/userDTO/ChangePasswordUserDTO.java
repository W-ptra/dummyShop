package com.dummyShop.dummyShop.dto.userDTO;

public class ChangePasswordUserDTO {
    private String password;
    private String confirmPassword;

    public ChangePasswordUserDTO(){}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
