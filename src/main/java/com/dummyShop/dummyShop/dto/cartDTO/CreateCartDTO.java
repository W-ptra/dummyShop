package com.dummyShop.dummyShop.dto.cartDTO;

public class CreateCartDTO {
    private Long productId;
    private int quantity;

    public CreateCartDTO(){}

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
