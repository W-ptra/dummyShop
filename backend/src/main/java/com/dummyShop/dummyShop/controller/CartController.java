package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.configuration.GeneralConfiguration;
import com.dummyShop.dummyShop.dto.cartDTO.CreateCartDTO;
import com.dummyShop.dummyShop.dto.cartDTO.UpdateQuantityCartDTO;
import com.dummyShop.dummyShop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Map<String,Object>> getAllCart(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){
        return cartService.getAllCart(page,size);
    }

    @GetMapping("/first4")
    public ResponseEntity<Map<String,Object>> getFirst4Cart(
    ){
        return cartService.getFirst4Cart();
    }

    @GetMapping("/length")
    public ResponseEntity<Map<String,Object>> getCartLength(
    ){
        return cartService.getCartLengthByUserId();
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> createCart(
            @RequestBody CreateCartDTO createCartDTO
    ){
        return cartService.createCart(createCartDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String,Object>> updateCartQuantity(
            @PathVariable Long id,
            @RequestBody UpdateQuantityCartDTO updateQuantityCartDTO
    ){
        return cartService.updateCartQuantity(id,updateQuantityCartDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Object>> deleteCart(
            @PathVariable Long id
    ){
        return cartService.deleteCart(id);
    }
}
