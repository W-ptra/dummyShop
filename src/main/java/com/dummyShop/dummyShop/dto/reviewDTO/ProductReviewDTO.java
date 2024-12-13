package com.dummyShop.dummyShop.dto.reviewDTO;

import com.dummyShop.dummyShop.model.Review;

import java.util.List;

public class ProductReviewDTO {
    private String name;
    private String content;
    private Double star;

    public ProductReviewDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Double getStar() {
        return star;
    }

    public void setStar(Double star) {
        this.star = star;
    }

    public static List<ProductReviewDTO> convertToDTO(List<Review> reviewList){
        return reviewList.stream()
                .map( review -> {
                    ProductReviewDTO productReviewDTO = new ProductReviewDTO();
                    productReviewDTO.setName(review.getUser().getName());
                    productReviewDTO.setStar(review.getStar());
                    productReviewDTO.setContent(review.getContent());
                    return  productReviewDTO;
                })
                .toList();
    }
}
