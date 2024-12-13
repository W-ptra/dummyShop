package com.dummyShop.dummyShop.dto.productDTO;

import com.dummyShop.dummyShop.dto.reviewDTO.ProductReviewDTO;

import java.util.List;

public class DetailProductDTO {
    private String name;
    private Double price;
    private String description;
    private String image;
    private String seller;
    private Double star;
    private Long sold;

    private List<ProductReviewDTO> productReviewDTOList;

    public  DetailProductDTO(){}

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public List<ProductReviewDTO> getProductReviewDTOList() {
        return productReviewDTOList;
    }

    public void setProductReviewDTOList(List<ProductReviewDTO> productReviewDTOList) {
        this.productReviewDTOList = productReviewDTOList;
    }
}
