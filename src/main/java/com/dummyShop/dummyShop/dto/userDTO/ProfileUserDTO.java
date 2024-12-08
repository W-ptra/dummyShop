package com.dummyShop.dummyShop.dto.userDTO;

import com.dummyShop.dummyShop.model.User;

public class ProfileUserDTO {
    private Long id;
    private String email;
    private String name;
    private String role;

    public ProfileUserDTO(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static ProfileUserDTO ConvertToDTO(User user){
        ProfileUserDTO profileUserDTO = new ProfileUserDTO();
        profileUserDTO.setId(user.getId());
        profileUserDTO.setEmail(user.getEmail());
        profileUserDTO.setName(user.getName());
        profileUserDTO.setRole(user.getRole());
        return profileUserDTO;
    }

    public static User ConvertToModel(ProfileUserDTO profileUserDTO){
        User user = new User();
        user.setId(profileUserDTO.getId());
        user.setEmail(profileUserDTO.getEmail());
        user.setName(user.getName());
        user.setRole(user.getRole());
        return user;
    }
}
