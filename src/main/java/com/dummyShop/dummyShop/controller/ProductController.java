package com.dummyShop.dummyShop.controller;


import com.dummyShop.dummyShop.dto.productDTO.CreateAndUpdateProductDTO;
import com.dummyShop.dummyShop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Map<String,Object>> getAllProduct(
            @RequestParam(required = false) String search
    ){
        return productService.getAllProduct(search);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String,Object>> getProductById(
            @PathVariable Long id
    ){
        return productService.getProductById(id);
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> createProduct(
            @RequestBody CreateAndUpdateProductDTO createAndUpdateProductDTO
    ){
        return productService.createProduct(createAndUpdateProductDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String,Object>> updateProduct(
            @PathVariable Long id,
            @RequestBody CreateAndUpdateProductDTO createAndUpdateProductDTO
    ){
        return productService.updateProduct(id,createAndUpdateProductDTO);
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Map<String,Object>> deleteProduct(
            @PathVariable Long id
    ){
        return  productService.deleteProduct(id);
    }

}
