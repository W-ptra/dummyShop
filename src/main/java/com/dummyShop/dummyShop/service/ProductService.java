package com.dummyShop.dummyShop.service;


import com.dummyShop.dummyShop.dto.productDTO.CreateAndUpdateProductDTO;
import com.dummyShop.dummyShop.dto.productDTO.DetailProductDTO;
import com.dummyShop.dummyShop.dto.productDTO.ShowcaseProductDTO;
import com.dummyShop.dummyShop.model.Product;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.ProductRepository;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;

    public ResponseEntity<Map<String,Object>> getAllProduct(
            String name
    ){
        List<Product> productList;

        if (name != null && !name.isEmpty()){
            productList = productRepository.getAllProductByName(name);
        } else {
            productList = productRepository.findAll();
        }

        List<ShowcaseProductDTO> showcaseProductDTOList = ShowcaseProductDTO.convertToDTO(productList);

        if (productList.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            "products is empty or not found"
                    );
        }

        return responseEntityBuilder
                .createResponse(
                        200,
                        "products",
                        showcaseProductDTOList
                );
    }

    public ResponseEntity<Map<String,Object>> getProductById(
            Long id
    ){
        boolean isIdNotValid = id < 0;
        if (isIdNotValid){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            String.format("product id %d is invalid",id)
                    );
        }

        Optional<Product> product = productRepository.getProductById(id);

        if (product.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            String.format("product with id %s is not found",id)
                    );
        }

        DetailProductDTO detailProductDTO = DetailProductDTO.convertToDTO(product.get());

        return responseEntityBuilder
                .createResponse(
                        200,
                        "product",
                        detailProductDTO
                );
    }

    public ResponseEntity<Map<String,Object>> createProduct(
            CreateAndUpdateProductDTO createAndUpdateProductDTO
    ){
        boolean isNameEmpty = createAndUpdateProductDTO.getName() == null || createAndUpdateProductDTO.getName().isEmpty();
        boolean isDescriptionEmpty = createAndUpdateProductDTO.getDescription() == null || createAndUpdateProductDTO.getDescription().isEmpty();
        boolean isImageEmpty = createAndUpdateProductDTO.getImage() == null || createAndUpdateProductDTO.getImage().isEmpty();
        boolean isPriceEmpty = createAndUpdateProductDTO.getPrice() == null;
        boolean isPriceValid = createAndUpdateProductDTO.getPrice() < 0 || createAndUpdateProductDTO.getPrice() > 1000000000;

        if (isNameEmpty || isDescriptionEmpty || isImageEmpty || isPriceEmpty){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "missing field 'name','price','description' or 'image'"
                    );
        }

        if(isPriceValid){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "price can't below 0 or above 1000000000"
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional <User> user = userRepository.findById(userId);

        Product product = CreateAndUpdateProductDTO.convertToModel(createAndUpdateProductDTO);
        product.setSold(0L);
        product.setStar(0.0);
        product.setUser(user.get());
        product = productRepository.save(product);

        return responseEntityBuilder
                .createResponse(
                        201,
                        "message",
                        String.format("successfully create product with id %d",product.getId())
                );
    }

    public ResponseEntity<Map<String,Object>> updateProduct(
            Long productId,
            CreateAndUpdateProductDTO createAndUpdateProductDTO
    ){
        boolean isNameEmpty = createAndUpdateProductDTO.getName() == null || createAndUpdateProductDTO.getName().isEmpty();
        boolean isDescriptionEmpty = createAndUpdateProductDTO.getDescription() == null || createAndUpdateProductDTO.getDescription().isEmpty();
        boolean isImageEmpty = createAndUpdateProductDTO.getImage() == null || createAndUpdateProductDTO.getImage().isEmpty();
        boolean isPriceEmpty = createAndUpdateProductDTO.getPrice() == null;
        boolean isPriceNotValid = createAndUpdateProductDTO.getPrice() < 0 || createAndUpdateProductDTO.getPrice() > 1000000000;
        boolean isIdNotValid = productId < 0;

        if (isNameEmpty || isDescriptionEmpty || isImageEmpty || isPriceEmpty){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "missing field 'name','price','description' or 'image'"
                    );
        }

        if(isIdNotValid){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            String.format("product id %d is invalid",productId)
                    );
        }

        if(isPriceNotValid){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "price can't below 0 or above 1000000000"
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<Product> product = productRepository.isProductWithProductIdAndUserIdExist(productId,userId);

        boolean isProductExist = product == null || product.isEmpty();

        if(isProductExist){
            return responseEntityBuilder
                    .createResponse(
                            409,
                            "message",
                            String.format(
                                    "product with id %d doesn't belong to user with id %d"
                                    ,productId
                                    ,userId
                            )
                    );
        }

        product.get().setName(createAndUpdateProductDTO.getName());
        product.get().setPrice(createAndUpdateProductDTO.getPrice());
        product.get().setDescription(createAndUpdateProductDTO.getDescription());

        productRepository.save(product.get());

        return responseEntityBuilder
                .createResponse(
                        200,
                        "message",
                        String.format("successfully update product with id %d",productId)
                );
    }

    public ResponseEntity<Map<String,Object>> deleteProduct(
            Long productId
    ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<Product> product = productRepository.isProductWithProductIdAndUserIdExist(productId,userId);

        boolean isProductExist = product == null || product.isEmpty();

        if(isProductExist){
            return responseEntityBuilder
                    .createResponse(
                            409,
                            "message",
                            String.format(
                                    "product with id %d doesn't belong to user with id %d"
                                    ,productId
                                    ,userId
                            )
                    );
        }

        productRepository.delete(product.get());

        return responseEntityBuilder
                .createResponse(
                        200,
                        "message",
                        String.format("successfully delete product with id %d",productId)
                );
    }
}
