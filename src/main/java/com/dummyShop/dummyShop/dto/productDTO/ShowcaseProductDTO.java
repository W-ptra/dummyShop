package com.dummyShop.dummyShop.dto.productDTO;

import com.dummyShop.dummyShop.model.Product;

import java.util.List;

public class ShowcaseProductDTO {
    private String name;
    private Double price;
    private String image;
    private String seller;
    private Double star;
    private Long sold;

    public ShowcaseProductDTO(){}

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

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public Double getStar() {
        return star;
    }

    public void setStar(Double star) {
        this.star = star;
    }

    public Long getSold() {
        return sold;
    }

    public void setSold(Long sold) {
        this.sold = sold;
    }

    public static List<ShowcaseProductDTO> convertToDTO(List<Product> productList){
        return productList.stream()
                .map( product -> {
                    ShowcaseProductDTO showcaseProductDTO = new ShowcaseProductDTO();
                    showcaseProductDTO.setName(product.getName());
                    showcaseProductDTO.setPrice(product.getPrice());
                    showcaseProductDTO.setSold(product.getSold());
                    showcaseProductDTO.setStar(product.getStar());
                    showcaseProductDTO.setSeller(product.getUser().getName());
                    showcaseProductDTO.setImage(product.getImage());
                    return  showcaseProductDTO;
                }).toList();
    }
}
