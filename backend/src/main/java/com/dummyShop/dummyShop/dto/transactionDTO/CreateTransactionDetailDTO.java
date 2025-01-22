package com.dummyShop.dummyShop.dto.transactionDTO;

import com.fasterxml.jackson.annotation.JsonAlias;

public class CreateTransactionDetailDTO {
    @JsonAlias("id")
    private Long productId;
    private int quantity;

    public CreateTransactionDetailDTO(){}

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
