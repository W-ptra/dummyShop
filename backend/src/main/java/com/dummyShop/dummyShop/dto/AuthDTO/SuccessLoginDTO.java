package com.dummyShop.dummyShop.dto.AuthDTO;

import com.dummyShop.dummyShop.dto.userDTO.ProfileUserDTO;
import com.dummyShop.dummyShop.model.User;

public class SuccessLoginDTO {
    private String token;
    private String  name;
    private String role;
    private Long userId;
    private String image;
    private String banner;

    public SuccessLoginDTO(){}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public static SuccessLoginDTO convertToDTO(
            String token,
            User user
    ){
        SuccessLoginDTO successLoginDTO = new SuccessLoginDTO();
        successLoginDTO.setToken(token);
        successLoginDTO.setUserId(user.getId());
        successLoginDTO.setName(user.getName());
        successLoginDTO.setRole(user.getRole());
        successLoginDTO.setImage(user.getImage());
        successLoginDTO.setBanner(user.getBanner());
        return  successLoginDTO;
    }
}
