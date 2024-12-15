package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.TransactionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetail,Long> {

}
