package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<Map<String,Object>> getAllTagByName(
            @RequestParam(required = false) String name
    ){
        return tagService.getAllTagByName(name);
    }
}
