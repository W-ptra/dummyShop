package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.configuration.GeneralConfiguration;
import com.dummyShop.dummyShop.dto.productDTO.CreateAndUpdateProductDTO;
import com.dummyShop.dummyShop.dto.productDTO.DetailProductDTO;
import com.dummyShop.dummyShop.dto.productDTO.ShowcaseProductDTO;
import com.dummyShop.dummyShop.dto.productDTO.ShowcaseProductPaginationDTO;
import com.dummyShop.dummyShop.model.Product;
import com.dummyShop.dummyShop.model.Tag;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.ProductRepository;
import com.dummyShop.dummyShop.repository.TagRepository;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import com.dummyShop.dummyShop.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;
    @Autowired
    private Validation validation;
    @Autowired
    private GeneralConfiguration generalConfiguration;

    public ResponseEntity<Map<String,Object>> getAllProduct(
            String name,
            int page
    ){
        int size = generalConfiguration.getPAGINATION_SIZE();
        Pageable pageable = PageRequest.of(page,size);

        List<Product> productList;
        Long totalLength;

        if (name != null && !name.isEmpty()){
            productList = productRepository.getAllProductByName(name,pageable);
            totalLength = productRepository.getTotalLengthAllProductByName(name);
        } else {
            productList = productRepository.getAll(pageable);
            totalLength = productRepository.getTotalLengthAllProduct();
        }

        ShowcaseProductPaginationDTO showcaseProductPaginationDTO = ShowcaseProductPaginationDTO.convertToDTO(productList,totalLength);

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
                        showcaseProductPaginationDTO
                );
    }

    public ResponseEntity<Map<String,Object>> getProductByUserId(
            int page
    ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        int size = generalConfiguration.getPAGINATION_SIZE();

        Pageable pageable = PageRequest.of(page,size);

        List<Product> productList = productRepository.getProductByUserId(userId,pageable);

        if(productList.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "message",
                            "products is empty"
                    );
        }

        Long productTotalLength = productRepository.getTotalLengthAllProductByUserId(userId);
        ShowcaseProductPaginationDTO showcaseProductPaginationDTO = ShowcaseProductPaginationDTO
                .convertToDTO(productList,productTotalLength);

        return responseEntityBuilder
                .createResponse(
                        200,
                        "products",
                        showcaseProductPaginationDTO
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
        boolean isTagEmpty = createAndUpdateProductDTO.getTagDTOList() == null || createAndUpdateProductDTO.getTagDTOList().isEmpty();

        if (isNameEmpty || isDescriptionEmpty || isImageEmpty || isPriceEmpty || isTagEmpty){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "missing field name, price, description, image or tags"
                    );
        }

        if(validation.isPriceNotValid(createAndUpdateProductDTO.getPrice())){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "price can't below 0 or above 1000000000"
                    );
        }

        if(validation.isListNotValid(createAndUpdateProductDTO.getTagDTOList())){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "the number of tag exceed the maximum"
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional <User> user = userRepository.findById(userId);

        Set<Tag> tagList = getTagList(createAndUpdateProductDTO.getTagDTOList());

        Product product = CreateAndUpdateProductDTO.convertToModel(createAndUpdateProductDTO);
        product.setSold(0L);
        product.setStar(0.0);
        product.setUser(user.get());
        product.setTagSet(tagList);

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
        boolean isTagEmpty = createAndUpdateProductDTO.getTagDTOList() == null || createAndUpdateProductDTO.getTagDTOList().isEmpty();

        if (isNameEmpty || isDescriptionEmpty || isImageEmpty || isPriceEmpty || isTagEmpty){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "missing field name, price, description, image or tags"
                    );
        }

        if(validation.isPriceNotValid(createAndUpdateProductDTO.getPrice())){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "price can't below 0 or above 1000000000"
                    );
        }

        if(validation.isListNotValid(createAndUpdateProductDTO.getTagDTOList())){
            return responseEntityBuilder
                    .createResponse(
                            400,
                            "message",
                            "the number of tag exceed the maximum"
                    );
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<Product> getProduct = productRepository.isProductWithProductIdAndUserIdExist(productId,userId);

        boolean isProductExist = getProduct == null || getProduct.isEmpty();

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

        Product product = getProduct.get();

        List<Long> tagIdList = product.getTagSet().stream().map(Tag::getId).toList();

        product.setName(createAndUpdateProductDTO.getName());
        product.setPrice(createAndUpdateProductDTO.getPrice());
        product.setDescription(createAndUpdateProductDTO.getDescription());
        product.setImage(createAndUpdateProductDTO.getImage());
        product.setTagSet(getTagList(createAndUpdateProductDTO.getTagDTOList()));

        productRepository.save(product);

        tagIdList.forEach(id -> {
            Optional<Tag> tag = tagRepository.findById(id);
            if(tag.get().getProductSet().isEmpty()){
                tagRepository.delete(tag.get());
            }
        });

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

    private Set<String> removeDuplicate(List<String> stringList){
        return new HashSet<>(stringList);
    }

    private Set<Tag> getTagList(List<String> stringList){
        Set<Tag> tagList = new HashSet<>();

        tagList = tagRepository.getTagByMultipleName(removeDuplicate(stringList));

        for (String string : stringList){
            boolean exists = tagList.stream().anyMatch(tag -> tag.getName().equals(string));

            if (!exists) {
                Tag tag = new Tag();
                tag.setName(string);
                tag = tagRepository.save(tag);
                tagList.add(tag);
            }
        }
        return tagList;
    }

}
