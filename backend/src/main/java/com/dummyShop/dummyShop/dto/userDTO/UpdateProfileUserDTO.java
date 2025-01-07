package com.dummyShop.dummyShop.dto.userDTO;

public class UpdateProfileUserDTO {
    private String name;
    private String email;

    public UpdateProfileUserDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
