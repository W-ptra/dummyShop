package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("SELECT p FROM Product p JOIN FETCH p.user WHERE p.name LIKE %:name%")
    List<Product> getAllProductByName(
            @Param("name") String name,
            Pageable pageable
    );

    @Query("SELECT COUNT(p) FROM Product p")
    Long getTotalLengthAllProduct();

    @Query("SELECT COUNT(p) FROM Product p WHERE p.name LIKE %:name%")
    Long getTotalLengthAllProductByName(
            @Param("name") String name
    );

    @Query("SELECT p FROM Product p WHERE p.user.id = :userId")
    List<Product> getProductByUserId(
            @Param("userId") Long id,
            Pageable pageable
    );

    @Query("SELECT COUNT(p) FROM Product p WHERE p.user.id = :userId")
    Long getTotalLengthAllProductByUserId(
            @Param("userId") Long id
    );

    @Query("SELECT p FROM Product p " +
            "LEFT JOIN FETCH p.transactionDetailList td " +
            "LEFT JOIN FETCH td.review " +
            "LEFT JOIN FETCH td.transactionHeader th " +
            "LEFT JOIN FETCH th.user " +
            "LEFT JOIN FETCH p.user " +
            "LEFT JOIN FETCH p.tagSet " +
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

    @Query("SELECT p FROM Product p")
    List<Product> getAll(Pageable pageable);
}
