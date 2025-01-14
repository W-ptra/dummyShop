package com.dummyShop.dummyShop.dto.productDTO;

import com.dummyShop.dummyShop.model.Product;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ShowcaseProductPaginationDTO {

    @JsonProperty("list")
    private List<ShowcaseProductDTO> showcaseProductDTOList;
    private Long totalLength;

    public ShowcaseProductPaginationDTO(){}

    public List<ShowcaseProductDTO> getShowcaseProductDTOList() {
        return showcaseProductDTOList;
    }

    public void setShowcaseProductDTOList(List<ShowcaseProductDTO> showcaseProductDTOList) {
        this.showcaseProductDTOList = showcaseProductDTOList;
    }

    public Long getTotalLength() {
        return totalLength;
    }

    public void setTotalLength(Long totalLength) {
        this.totalLength = totalLength;
    }

    public static ShowcaseProductPaginationDTO convertToDTO(List<Product> productList,Long totalLength){
        ShowcaseProductPaginationDTO showcaseProductPaginationDTO = new ShowcaseProductPaginationDTO();
        showcaseProductPaginationDTO.setTotalLength(totalLength);
        showcaseProductPaginationDTO.setShowcaseProductDTOList(ShowcaseProductDTO.convertToDTO(productList));
        return  showcaseProductPaginationDTO;
    }
}
