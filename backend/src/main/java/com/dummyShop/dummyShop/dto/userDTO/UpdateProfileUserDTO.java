package com.dummyShop.dummyShop.dto.userDTO;

import com.dummyShop.dummyShop.model.User;

public class UpdateProfileUserDTO {
    private String name;
    private String about;

    public UpdateProfileUserDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }
}
