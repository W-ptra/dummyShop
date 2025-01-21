package com.dummyShop.dummyShop.dto.tagDTO;

import com.dummyShop.dummyShop.model.Tag;
import jakarta.persistence.Tuple;

import java.util.List;
import java.util.Set;

public class TagDTO {
    private String name;
    private Long total;

    public TagDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public static List<TagDTO> convertToDTOtuple(List<Tuple> tuples){
        return tuples.stream().map(tuple -> {
            TagDTO tagDTO = new TagDTO();
            tagDTO.setName(tuple.get(0,Tag.class).getName());
            tagDTO.setTotal(tuple.get(1,Long.class));
            return  tagDTO;
        }).toList();
    }

    public static List<String> convertToDTO(Set<Tag> tagSet){
        return tagSet.stream()
                .map(tag -> tag.getName()).toList();
    }
    public static List<String> convertToDTO(List<Tag> tagSet){
        return tagSet.stream()
                .map(tag -> tag.getName()).toList();
    }
}
