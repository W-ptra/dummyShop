package com.dummyShop.dummyShop.dto.tagDTO;

import com.dummyShop.dummyShop.model.Tag;

import java.util.List;
import java.util.Set;

public class TagDTO {
    private String name;

    public TagDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static List<String> convertToDTO(Set<Tag> tagSet){
        return tagSet.stream()
                .map(tag -> tag.getName()).toList();
    }
}
