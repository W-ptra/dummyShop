package com.dummyShop.dummyShop.dto.productDTO;

import com.dummyShop.dummyShop.dto.tagDTO.TagDTO;
import com.dummyShop.dummyShop.model.Product;
import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.List;

public class CreateAndUpdateProductDTO {

    private String name;
    private Double price;
    private String description;
    private String image;
    @JsonAlias("tags")
    private List<String> tagDTOList;

    public CreateAndUpdateProductDTO() {
    }

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

    public List<String> getTagDTOList() {
        return tagDTOList;
    }

    public void setTagDTOList(List<String> tagDTOList) {
        this.tagDTOList = tagDTOList;
    }

    public static Product convertToModel(CreateAndUpdateProductDTO createAndUpdateProductDTO){
        Product product = new Product();
        product.setName(createAndUpdateProductDTO.getName());
        product.setPrice(createAndUpdateProductDTO.getPrice());
        product.setDescription(createAndUpdateProductDTO.getDescription());
        product.setImage(createAndUpdateProductDTO.getImage());

        //

        return product;
    }
}
