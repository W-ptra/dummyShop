package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.dto.transactionDTO.CreateTransactionHeaderDTO;
import com.dummyShop.dummyShop.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTransactionByUserId(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return transactionService.getAllTransactionByUserId(page,size);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createTransaction(
            @RequestBody CreateTransactionHeaderDTO createTransactionHeaderDTO
    ){
        return transactionService.createTransaction(createTransactionHeaderDTO);
    }
}
