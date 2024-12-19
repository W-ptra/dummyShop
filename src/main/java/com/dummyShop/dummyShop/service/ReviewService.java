package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.dto.reviewDTO.CreateReviewDTO;
import com.dummyShop.dummyShop.model.Product;
import com.dummyShop.dummyShop.model.Review;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.ProductRepository;
import com.dummyShop.dummyShop.repository.ReviewRepository;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;

    public ResponseEntity<Map<String, Object>> createReview(
            CreateReviewDTO createReviewDTO
    ){
        boolean isContentEmpty = createReviewDTO.getContent() == null || createReviewDTO.getContent().isEmpty();
        boolean isStarEmpty = createReviewDTO.getStar() == null;
        boolean isStarNotValid = createReviewDTO.getStar() < 1 || createReviewDTO.getStar() > 5;
        boolean isProductIdNotValid = createReviewDTO.getProductId() < 1;

        if (isContentEmpty || isStarEmpty){
            return responseEntityBuilder.createResponse(
                            400,
                            "message",
                            "missing field 'content' or 'star'"
                    );
        }

        if (isStarNotValid){
            return responseEntityBuilder.createResponse(
                    400,
                    "message",
                    "star must between 1 - 5"
            );
        }

        if(isProductIdNotValid){
            return responseEntityBuilder.createResponse(
                    400,
                    "message",
                    "'productId' can't 0 or negative"
            );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<User> user = userRepository.findById(userId);
        Optional<Product> product = productRepository.findById(createReviewDTO.getProductId());

        if(product == null || product.isEmpty()){
            return responseEntityBuilder.createResponse(
                    404,
                    "message",
                    String.format("product with id %d is not found",createReviewDTO.getProductId())
            );
        }

        Review review = CreateReviewDTO.convertToModel(createReviewDTO);
        review.setUser(user.get());
        //review.setProduct(product.get());

        review = reviewRepository.save(review);

        return responseEntityBuilder.createResponse(
                201,
                "message",
                String.format("Successfully create review with id %d",review.getId())
        );
    }
}
