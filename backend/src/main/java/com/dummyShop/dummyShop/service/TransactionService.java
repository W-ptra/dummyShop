package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.configuration.GeneralConfiguration;
import com.dummyShop.dummyShop.dto.transactionDTO.CreateTransactionDetailDTO;
import com.dummyShop.dummyShop.dto.transactionDTO.CreateTransactionHeaderDTO;
import com.dummyShop.dummyShop.dto.transactionDTO.ShowTransactionHeaderDTO;
import com.dummyShop.dummyShop.model.Product;
import com.dummyShop.dummyShop.model.TransactionDetail;
import com.dummyShop.dummyShop.model.TransactionHeader;
import com.dummyShop.dummyShop.model.User;
import com.dummyShop.dummyShop.repository.ProductRepository;
import com.dummyShop.dummyShop.repository.TransactionDetailRepository;
import com.dummyShop.dummyShop.repository.TransactionHeaderRepository;
import com.dummyShop.dummyShop.repository.UserRepository;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private TransactionHeaderRepository transactionHeaderRepository;
    @Autowired
    private TransactionDetailRepository transactionDetailRepository;
    @Autowired
    private ResponseEntityBuilder responseEntityBuilder;
    @Autowired
    private GeneralConfiguration generalConfiguration;

    public ResponseEntity<Map<String,Object>> createTransaction(
            CreateTransactionHeaderDTO createTransactionHeaderDTO
    ){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        Optional<User> user = userRepository.findById(userId);

        TransactionHeader transactionHeader = new TransactionHeader();
        transactionHeader.setDate(new Date(System.currentTimeMillis()));
        transactionHeader.setStatus("in progress");
        transactionHeader.setTotal(0.0);

        transactionHeader = transactionHeaderRepository.save(transactionHeader);

        Double counter = 0.0;
        List<TransactionDetail> transactionDetailList = new ArrayList<>();
        for(CreateTransactionDetailDTO element : createTransactionHeaderDTO.getTransactionDetailDTOList()){

            TransactionDetail transactionDetail = new TransactionDetail();
            Product product = fetchProductById(element.getProductId());

            if(product == null){

                // abort transaction
                transactionHeaderRepository.delete(transactionHeader);

                return responseEntityBuilder
                        .createResponse(
                                404,
                                "error",
                                String.format("product with id %d is not found",element.getProductId())
                        );
            }
            counter += element.getQuantity() * product.getPrice();

            transactionDetail.setQuantity(element.getQuantity());
            transactionDetail.setProduct(product);
            transactionDetail.setTransactionHeader(transactionHeader);
            transactionDetail.setReviewed(false);
            transactionDetailList.add(transactionDetail);
        }

        transactionDetailList = transactionDetailRepository.saveAll(transactionDetailList);
        transactionHeader.setTotal(counter);
        transactionHeader.setUser(user.get());
        transactionHeader.setStatus("complete");
        transactionHeader = transactionHeaderRepository.save(transactionHeader);

        transactionDetailList.forEach(transactionDetail -> {
            Optional<Product> getProduct = productRepository.findById(transactionDetail.getProduct().getId());
            Product product = getProduct.get();
            Long total = product.getSold() + transactionDetail.getQuantity();
            product.setSold(total);
            productRepository.save(product);
        });

        return responseEntityBuilder
                .createResponse(
                  200,
                  "message",
                  String.format("successfully create transaction with id %d",transactionHeader.getId())
                );
    }

    public ResponseEntity<Map<String,Object>> getAllTransactionByUserId(
            int page,
            int size
    ){
        if(size > generalConfiguration.getPAGINATION_MAX_SIZE()){
            size = 20;
        }

        Pageable pageable = PageRequest.of(page,size);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(authentication.getName());

        List<TransactionHeader> transactionHeaderList =
                transactionHeaderRepository.getAllTransactionByUserId(userId,pageable);

        if (transactionHeaderList.isEmpty()){
            return responseEntityBuilder
                    .createResponse(
                            404,
                            "error",
                            "transactions is empty"
                    );
        }

        List<ShowTransactionHeaderDTO> showTransactionHeaderDTOList =
                ShowTransactionHeaderDTO.convertToDTO(transactionHeaderList);

        return responseEntityBuilder
                .createResponse(
                        200,
                        "transactions",
                        showTransactionHeaderDTOList
                );
    }

    private Product fetchProductById(
            Long id
    ){
        Optional<Product> product = productRepository.findById(id);

        if (product == null || product.isEmpty()){
            return null;
        }

        return product.get();
    }

}
