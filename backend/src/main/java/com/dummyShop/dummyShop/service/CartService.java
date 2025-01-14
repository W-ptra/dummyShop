package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.configuration.GeneralConfiguration;
import com.dummyShop.dummyShop.dto.cartDTO.CreateCartDTO;
import com.dummyShop.dummyShop.dto.cartDTO.DetailCartDTO;
import com.dummyShop.dummyShop.dto.cartDTO.UpdateQuantityCartDTO;
import com.dummyShop.dummyShop.model.Cart;
import com.dummyShop.dummyShop.model.Product;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.CartRepository;
import com.dummyShop.dummyShop.repository.ProductRepository;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;
    @Autowired
    private GeneralConfiguration generalConfiguration;

    public ResponseEntity<Map<String,Object>> createCart(
            CreateCartDTO createCartDTO
    ){

        boolean isProductIdEmpty =  createCartDTO.getProductId() == null;
        boolean isQuantityZero = createCartDTO.getQuantity() == 0;

        if (isProductIdEmpty || isQuantityZero){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "missing field 'productId' or 'quantity'" + createCartDTO.getQuantity()
                    );
        }

        boolean isProductIdNotValid =  createCartDTO.getProductId() < 1;
        boolean isQuantityNotValid = createCartDTO.getQuantity() < 1 || createCartDTO.getQuantity() > 999;

        if (isProductIdNotValid || isQuantityNotValid){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "productId or quantity can't 0, negative or above 999"
                    );
        }

        Optional<Product> product = productRepository.findById(createCartDTO.getProductId());
        if (product == null || product.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            String.format("product with id %d is not found", createCartDTO.getProductId())
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<Cart> cart = cartRepository.
                getCartByProductIdAndUserId(createCartDTO.getProductId(),userId);

        if (cart.isPresent()){
            Cart getCart = cart.get();

            int quantity = getCart.getQuantity() + createCartDTO.getQuantity();
            getCart.setQuantity(quantity);

            getCart = cartRepository.save(getCart);

            return responseEntityBuilder
                    .createResponse(
                            200,
                            "message",
                            String.format("successfully add new cart with id %d",getCart.getId())
                    );
        }

        Optional<User> user = userRepository.findById(userId);

        Cart newCart = new Cart();
        newCart.setUser(user.get());
        newCart.setProduct(product.get());
        newCart.setQuantity(createCartDTO.getQuantity());

        newCart = cartRepository.save(newCart);

        return responseEntityBuilder
                .createResponse(
                        200,
                        "message",
                        String.format("successfully add new cart with id %d",newCart.getId())
                );
    }

    public ResponseEntity<Map<String,Object>> getAllCart(
            int page
    ){

        int size = generalConfiguration.getPAGINATION_SIZE();

        Pageable pageable = PageRequest.of(page,size);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        List<Cart> cartList = cartRepository.getCartByUserId(userId,pageable);

        if(cartList.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            "cart is empty"
                    );
        }

        List<DetailCartDTO> detailCartDTOList = DetailCartDTO.convertToDTO(cartList);

        return responseEntityBuilder
                .createResponse(
                        200,
                        "carts",
                        detailCartDTOList
                );
    }

    public ResponseEntity<Map<String,Object>> updateCartQuantity(
            Long id,
            UpdateQuantityCartDTO updateQuantityCartDTO
    ){
        boolean isIdNotValid = id < 1 || id > 100000000000L;
        boolean isQuantityNotValid = updateQuantityCartDTO.getQuantity() < 1 || updateQuantityCartDTO.getQuantity() > 999;

        if(isIdNotValid || isQuantityNotValid){
            return  responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "id or quantity can't 0, negative or above 999 for quantity and 100000000000 for id"
                    );
        }

        Optional<Cart> cart = cartRepository.findById(id);

        if(cart == null || cart.isEmpty()){
            return  responseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            String.format("cart with id %d is not found",id)
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        boolean isCartIdAndUserIdNotMatch = !cart.get().getUser().getId().equals(userId);

        if(isCartIdAndUserIdNotMatch){
            return  responseEntityBuilder
                    .createResponse(
                            409,
                            "message",
                            String.format("cart with id %d is not match with user with id %d",id,userId)
                    );
        }

        Cart updatedCart = cart.get();
        updatedCart.setQuantity(updateQuantityCartDTO.getQuantity());

        return  responseEntityBuilder
                .createResponse(
                        200,
                        "message",
                        "successfully update cart quantity"
                );
    }

    public ResponseEntity<Map<String,Object>> deleteCart(
            Long id
    ){

        boolean isIdNotValid = id < 1;
        if(isIdNotValid){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "id can't 0 or negative"
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<Cart> cart = cartRepository.findById(id);
        if( cart == null || cart.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            String.format("cart with id %d is not found",id)
                    );
        }

        boolean isCartBelongToThisUser = cart.get().getUser().getId() == userId;

        if(!isCartBelongToThisUser){
            return responseEntityBuilder
                    .createResponse(
                            403,
                            "message",
                            String.format("cart with is %d is not belong to user with id %d",id,userId)
                    );
        }

        cartRepository.delete(cart.get());

        return responseEntityBuilder
                .createResponse(
                        200,
                        "message",
                        String.format("successfully delete cart with id %d",id)
                );
    }
}
