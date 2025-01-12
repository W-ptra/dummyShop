package com.dummyShop.dummyShop.dto.userDTO;

import com.dummyShop.dummyShop.model.User;

public class SellerUserDTO {
    private Long id;
    private String image;
    private String name;

    public  SellerUserDTO(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public static SellerUserDTO convertToDTO(User user){
        SellerUserDTO sellerUserDTO = new SellerUserDTO();
        sellerUserDTO.setId(user.getId());
        sellerUserDTO.setImage(user.getImage());
        sellerUserDTO.setName(user.getName());
        return  sellerUserDTO;
    }
}
