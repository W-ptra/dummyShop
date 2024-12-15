package com.dummyShop.dummyShop.dto.reviewDTO;

import com.dummyShop.dummyShop.model.Review;

public class CreateReviewDTO {
    private String content;
    private Double star;
    private Long productId;

    public  CreateReviewDTO(){}

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

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public static Review convertToModel(CreateReviewDTO createReviewDTO){
        Review review = new Review();
        review.setContent(createReviewDTO.getContent());
        review.setStar(createReviewDTO.getStar());
        return review;
    }
}
