package com.dummyShop.dummyShop.dto.cartDTO;

import com.dummyShop.dummyShop.model.Cart;

import java.util.List;

public class DetailCartDTO {
    private Long id;
    private String name;
    private Double price;
    private String image;
    private int quantity;

    public DetailCartDTO(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public static List<DetailCartDTO> convertToDTO(List<Cart> cartList){
        return cartList.stream()
                .map( cart -> {
                    DetailCartDTO detailCartDTO = new DetailCartDTO();
                    detailCartDTO.setId(cart.getId());
                    detailCartDTO.setName(cart.getProduct().getName());
                    detailCartDTO.setPrice(cart.getProduct().getPrice());
                    detailCartDTO.setImage(cart.getProduct().getImage());
                    detailCartDTO.setQuantity(cart.getQuantity());
                    return  detailCartDTO;
                })
                .toList();
    }
}
