package com.dummyShop.dummyShop.dto.userDTO;

import com.dummyShop.dummyShop.model.User;

public class ProfileUserDTO {
    private Long id;
    private String name;
    private String email;
    private String image;
    private String banner;
    private String role;
    private String about;

    public ProfileUserDTO(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public String getImage() {
        return image;
    }

    public String getBanner() {
        return banner;
    }

    public String getRole() {
        return role;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public static ProfileUserDTO ConvertToDTO(User user){
        ProfileUserDTO profileUserDTO = new ProfileUserDTO();
        profileUserDTO.setId(user.getId());
        profileUserDTO.setEmail(user.getEmail());
        profileUserDTO.setName(user.getName());
        profileUserDTO.setImage(user.getImage());
        profileUserDTO.setBanner(user.getBanner());
        profileUserDTO.setRole(user.getRole());
        profileUserDTO.setAbout(user.getAbout());
        return profileUserDTO;
    }
}
