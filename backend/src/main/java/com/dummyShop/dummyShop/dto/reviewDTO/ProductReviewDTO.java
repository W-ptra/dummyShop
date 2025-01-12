package com.dummyShop.dummyShop.dto.reviewDTO;

import com.dummyShop.dummyShop.dto.userDTO.SellerUserDTO;
import com.dummyShop.dummyShop.model.Review;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ProductReviewDTO {
    private String content;
    private Double star;

    @JsonProperty("user")
    private SellerUserDTO sellerUserDTO;

    public ProductReviewDTO(){}

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

    public SellerUserDTO getSellerUserDTO() {
        return sellerUserDTO;
    }

    public void setSellerUserDTO(SellerUserDTO sellerUserDTO) {
        this.sellerUserDTO = sellerUserDTO;
    }

    public static List<ProductReviewDTO> convertToDTO(List<Review> reviewList){
        return reviewList.stream()
                .map( review -> {
                    ProductReviewDTO productReviewDTO = new ProductReviewDTO();
                    productReviewDTO.setStar(review.getStar());
                    productReviewDTO.setContent(review.getContent());

                    productReviewDTO
                            .setSellerUserDTO(
                                    SellerUserDTO.convertToDTO(review
                                            .getTransactionDetail().getTransactionHeader().getUser()
                                    )
                            );

                    return  productReviewDTO;
                })
                .toList();
    }
}
