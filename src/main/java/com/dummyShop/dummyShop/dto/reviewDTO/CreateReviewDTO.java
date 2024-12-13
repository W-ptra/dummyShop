package com.dummyShop.dummyShop.dto.reviewDTO;

import com.dummyShop.dummyShop.model.Review;

public class CreateReviewDTO {
    private String content;
    private Double star;

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

    public static Review convertToModel(CreateReviewDTO createReviewDTO){
        Review review = new Review();
        review.setContent(createReviewDTO.getContent());
        review.setStar(createReviewDTO.getStar());
        return review;
    }
}
