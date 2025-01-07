package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.Cart;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId")
    public List<Cart> getCartByUserId(
            @Param("userId") Long userId,
            Pageable pageable
    );

    @Query("SELECT c FROM Cart c WHERE c.product.id = :productId AND c.user.id = :userId")
    public Optional<Cart> getCartByProductIdAndUserId(
            @Param("productId") Long productId,
            @Param("userId") Long userId
    );

    @Query("SELECT c FROM Cart c JOIN FETCH c.user WHERE c.id = :id")
    public Optional<Cart> getCartAndUserById(
            @Param("id") Long id
    );
}
