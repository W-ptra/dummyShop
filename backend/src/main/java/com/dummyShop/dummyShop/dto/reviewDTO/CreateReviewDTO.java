package com.dummyShop.dummyShop.dto.reviewDTO;

import com.dummyShop.dummyShop.model.Review;

public class CreateReviewDTO {
    private String content;
    private Double star;
    private Long transactionDetailId;

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

    public Long getTransactionDetailId() {
        return transactionDetailId;
    }

    public void setTransactionDetailId(Long transactionDetailId) {
        this.transactionDetailId = transactionDetailId;
    }
}
