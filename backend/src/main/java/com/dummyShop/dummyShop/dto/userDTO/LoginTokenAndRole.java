package com.dummyShop.dummyShop.dto.userDTO;

public class LoginTokenAndRole {
    private String token;
    private String role;

    public LoginTokenAndRole(){}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
