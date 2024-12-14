package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("SELECT p FROM Product p JOIN FETCH p.user WHERE p.name LIKE %:name%")
    List<Product> getAllProductByName(
            @Param("name") String name
    );

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.reviewList JOIN FETCH p.user " +
            "WHERE p.id = :id")
    Optional<Product> getProductById(
            @Param("id") Long id
    );

    @Query("SELECT p FROM Product p " +
            "WHERE p.id = :productId AND p.user.id = :userId")
    Optional<Product> isProductWithProductIdAndUserIdExist(
            @Param("productId") Long productId,
            @Param("userId") Long userId
    );
}
