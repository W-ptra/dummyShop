package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.dto.reviewDTO.CreateReviewDTO;
import com.dummyShop.dummyShop.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Map<String,Object>> createReview(
            @RequestBody CreateReviewDTO createReviewDTO
    ){
        return reviewService.createReview(createReviewDTO);
    }
}
