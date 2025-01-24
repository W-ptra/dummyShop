package com.dummyShop.dummyShop.dto.userDTO;

import com.dummyShop.dummyShop.model.User;
import jakarta.persistence.Tuple;

import java.util.List;

public class TopSellerDTO {
    private Long userId;
    private String name;
    private String about;
    private String image;
    private String banner;
    private Long solds;
    private Double star;

    public TopSellerDTO(){}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public Long getSolds() {
        return solds;
    }

    public void setSolds(Long solds) {
        this.solds = solds;
    }

    public Double getStar() {
        return star;
    }

    public void setStar(Double star) {
        this.star = star;
    }

    public static List<TopSellerDTO> cnvertToDTO(List<Tuple> tupleList){
        return tupleList.stream().map((tuple)->{
            TopSellerDTO topSellerDTO = new TopSellerDTO();
            topSellerDTO.setName(tuple.get(0, User.class).getName());
            topSellerDTO.setAbout(tuple.get(0, User.class).getAbout());
            topSellerDTO.setBanner(tuple.get(0, User.class).getBanner());
            topSellerDTO.setImage(tuple.get(0, User.class).getImage());
            topSellerDTO.setUserId(tuple.get(0, User.class).getId());
            topSellerDTO.setSolds(tuple.get(1, Long.class));
            topSellerDTO.setStar(tuple.get(2, Double.class));
            return topSellerDTO;
        }).toList();
    }
}
