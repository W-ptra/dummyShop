package com.dummyShop.dummyShop.dto.productDTO;

import com.dummyShop.dummyShop.dto.tagDTO.TagDTO;
import com.dummyShop.dummyShop.dto.userDTO.SellerUserDTO;
import com.dummyShop.dummyShop.model.Product;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ShowcaseProductDTO {
    private Long id;
    private String name;
    private Double price;
    private String description;
    private String image;
    private Double star;
    private Long sold;
    @JsonProperty("seller")
    private SellerUserDTO sellerUserDTO;
    @JsonProperty("tags")
    private List<String> tagDTOList;

    public ShowcaseProductDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setStar(Double star) {
        this.star = star;
    }

    public void setSold(Long sold) {
        this.sold = sold;
    }

    public Long getId() {
        return id;
    }

    public Double getPrice() {
        return price;
    }

    public Double getStar() {
        return star;
    }

    public Long getSold() {
        return sold;
    }

    public SellerUserDTO getSellerUserDTO() {
        return sellerUserDTO;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSellerUserDTO(SellerUserDTO sellerUserDTO) {
        this.sellerUserDTO = sellerUserDTO;
    }

    public List<String> getTagDTOList() {
        return tagDTOList;
    }

    public void setTagDTOList(List<String> tagDTOList) {
        this.tagDTOList = tagDTOList;
    }

    public static List<ShowcaseProductDTO> convertToDTO(List<Product> productList){
        return productList.stream()
                .map( product -> {
                    ShowcaseProductDTO showcaseProductDTO = new ShowcaseProductDTO();
                    showcaseProductDTO.setId(product.getId());
                    showcaseProductDTO.setName(product.getName());
                    showcaseProductDTO.setPrice(product.getPrice());
                    showcaseProductDTO.setSold(product.getSold());
                    showcaseProductDTO.setStar(product.getStar());
                    showcaseProductDTO.setImage(product.getImage());
                    showcaseProductDTO.setDescription(product.getDescription());
                    showcaseProductDTO.setTagDTOList(TagDTO.convertToDTO(product.getTagSet()));


                    showcaseProductDTO.setSellerUserDTO(SellerUserDTO.convertToDTO(product.getUser()));

                    return  showcaseProductDTO;
                }).toList();
    }
}
