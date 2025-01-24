package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.User;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.email = :email")
    boolean isExistsByEmail(String email);

    Optional<User> findByEmail(String Email);

    @Query("SELECT u, SUM(td.quantity), (SUM(pls.star) * 1.0 / COUNT(pls)) " +
            "FROM User u " +
            "LEFT JOIN u.productList pls " +
            "LEFT JOIN pls.transactionDetailList td  " +
            "WHERE u.role = 'seller' "+
            "GROUP BY u " +
            "ORDER BY SUM(td.quantity) DESC")
    List<Tuple> getTopSeller(Pageable pageable);

}
