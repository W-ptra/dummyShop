package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.TransactionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetail,Long> {

    @Query("SELECT td FROM TransactionDetail td " +
            "JOIN FETCH td.transactionHeader  th " +
            "JOIN FETCH td.product " +
            "JOIN FETCH  th.user " +
            "LEFT JOIN FETCH td.review " +
            "WHERE td.id = :id")
    Optional<TransactionDetail> getTransactionDetailAndUserById(
      @Param("id") Long id
    );
}
