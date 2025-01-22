package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.dto.reviewDTO.CreateReviewDTO;
import com.dummyShop.dummyShop.model.Product;
import com.dummyShop.dummyShop.model.Review;
import com.dummyShop.dummyShop.model.TransactionDetail;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.ProductRepository;
import com.dummyShop.dummyShop.repository.ReviewRepository;
import com.dummyShop.dummyShop.repository.TransactionDetailRepository;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import com.dummyShop.dummyShop.utils.Validation;
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
    private TransactionDetailRepository transactionDetailRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;
    @Autowired
    private Validation validation;

    public ResponseEntity<Map<String, Object>> createReview(
            CreateReviewDTO createReviewDTO
    ){
        boolean isContentEmpty = createReviewDTO.getContent() == null || createReviewDTO.getContent().isEmpty();
        boolean isStarEmpty = createReviewDTO.getStar() == null;
        boolean isTransactionDetailIdEmpty = createReviewDTO.getTransactionDetailId() == null;

        if (isContentEmpty || isStarEmpty || isTransactionDetailIdEmpty){
            return responseEntityBuilder.createResponse(
                            400,
                            "message",
                            "missing field content, star or transactionDetailId"
                    );
        }

        if (validation.isStarNotValid(createReviewDTO.getStar())){
            return responseEntityBuilder.createResponse(
                    400,
                    "message",
                    "star must between 1 - 5"
            );
        }

        if(validation.isIdNotValid(createReviewDTO.getTransactionDetailId())){
            return responseEntityBuilder.createResponse(
                    400,
                    "message",
                    "transactionDetailId can't 0 or negative"
            );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<TransactionDetail> getTransactionDetail =
                transactionDetailRepository
                        .getTransactionDetailAndUserById(
                                createReviewDTO.getTransactionDetailId()
                        );

        if(getTransactionDetail == null || getTransactionDetail.isEmpty()){
            return responseEntityBuilder.createResponse(
                    404,
                    "message",
                    String.format("transactionDetail with id %d is not found",createReviewDTO.getTransactionDetailId())
            );
        }

        TransactionDetail transactionDetail = getTransactionDetail.get();

        if(transactionDetail.getReview() != null){
            return responseEntityBuilder.createResponse(
                    409,
                    "message",
                    "review already exist"
            );
        }

        boolean isTransactionDetailAndUserNotMatch =
                !transactionDetail.getTransactionHeader().getUser().getId().equals(userId);

        if (isTransactionDetailAndUserNotMatch){
            return responseEntityBuilder.createResponse(
                    409,
                    "message",
                    String.format("transactionDetail with id %d is not match with user with id %d",
                            createReviewDTO.getTransactionDetailId(),
                            userId
                    )
            );
        }

        transactionDetail.setReviewed(true);
        transactionDetailRepository.save(transactionDetail);

        Review review = new Review();
        review.setContent(createReviewDTO.getContent());
        review.setStar(createReviewDTO.getStar());
        review.setTransactionDetail(transactionDetail);

        review = reviewRepository.save(review);

        Double star = transactionDetail.getProduct().getStar();
        if (star == 0.0){
            star = review.getStar();
        } else {
            star = (star + review.getStar())/2;
        }

        Product product = transactionDetail.getProduct();
        product.setStar(star);

        productRepository.save(product);

        return responseEntityBuilder.createResponse(
                201,
                "message",
                String.format("Successfully create review with id %d",review.getId())
        );
    }
}
