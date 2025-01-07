package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.dto.tagDTO.TagDTO;
import com.dummyShop.dummyShop.model.Tag;
import com.dummyShop.dummyShop.repository.TagRepository;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;

    public ResponseEntity<Map<String,Object>> getAllTagByName(String name){
        Pageable pageable = PageRequest.of(0,10);

        List<Tag> tagList = new ArrayList<>();

        if(name == null || name.isEmpty()){
            tagList = tagRepository.getAll(pageable);
        } else {
            tagList = tagRepository.getAllTagByName(name,pageable);
        }

        List<String> tagDTOList = TagDTO.convertToDTO(tagList);

        if(tagList.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                      404,
                      "message",
                      String.format("tag with name %s is not found",name)
                    );
        }

        return responseEntityBuilder
                .createResponse(
                        200,
                        "tags",
                        tagDTOList
                );
    }
}
