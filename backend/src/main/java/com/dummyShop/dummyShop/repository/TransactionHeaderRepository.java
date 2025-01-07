package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.TransactionHeader;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionHeaderRepository extends JpaRepository<TransactionHeader,Long> {

    @Query("SELECT t FROM TransactionHeader t JOIN FETCH t.transactionDetailList" +
            " WHERE t.user.id = :userId")
    List<TransactionHeader> getAllTransactionByUserId(
      @Param("userId") Long userId,
      Pageable pageable
    );
}
