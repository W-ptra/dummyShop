package com.dummyShop.dummyShop.dto.productDTO;

import com.dummyShop.dummyShop.dto.reviewDTO.ProductReviewDTO;
import com.dummyShop.dummyShop.dto.tagDTO.TagDTO;
import com.dummyShop.dummyShop.model.Product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DetailProductDTO {
    private String name;
    private Double price;
    private String description;
    private String image;
    private String seller;
    private Double star;
    private Long sold;

    private List<String> tags;

    private List<ProductReviewDTO> reviews;


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

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<ProductReviewDTO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ProductReviewDTO> reviews) {
        this.reviews = reviews;
    }

    public static DetailProductDTO convertToDTO(Product product){
        DetailProductDTO detailProductDTO = new DetailProductDTO();
        detailProductDTO.setName(product.getName());
        detailProductDTO.setPrice(product.getPrice());
        detailProductDTO.setDescription(product.getDescription());

        List<ProductReviewDTO> productReviewDTOList = new ArrayList<>();
        Set<Long> seenReviews = new HashSet<>();

        product.getTransactionDetailList()
                .forEach(transactionDetail -> {
                    if (transactionDetail.getReview() != null) {

                        Long reviewId = transactionDetail.getReview().getId();
                        if (!seenReviews.contains(reviewId)) {
                            ProductReviewDTO productReviewDTO = new ProductReviewDTO();
                            productReviewDTO.setContent(transactionDetail.getReview().getContent());
                            productReviewDTO.setStar(transactionDetail.getReview().getStar());
                            productReviewDTO.setName(transactionDetail.getTransactionHeader().getUser().getName());

                            productReviewDTOList.add(productReviewDTO);
                            seenReviews.add(reviewId);
                        }
                    }
                });

        detailProductDTO.setTags(TagDTO.convertToDTO(product.getTagSet()));
        detailProductDTO.setReviews(productReviewDTOList);
        detailProductDTO.setSold(product.getSold());
        detailProductDTO.setStar(product.getStar());
        detailProductDTO.setImage(product.getImage());
        detailProductDTO.setSeller(product.getUser().getName());

        return detailProductDTO;
    }
}
