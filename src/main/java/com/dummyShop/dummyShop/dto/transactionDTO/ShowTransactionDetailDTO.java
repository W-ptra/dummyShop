package com.dummyShop.dummyShop.dto.transactionDTO;

import com.dummyShop.dummyShop.model.Product;
import com.dummyShop.dummyShop.model.TransactionDetail;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;

public class ShowTransactionDetailDTO {

    private String name;
    private Double price;
    private String seller;
    private String image;
    private int quantity;

    public ShowTransactionDetailDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public static List<ShowTransactionDetailDTO> convertToDTO(List<TransactionDetail> transactionDetailList){
        return transactionDetailList.stream()
                .map(transactionDetail -> {
                    ShowTransactionDetailDTO showTransactionDetailDTO = new ShowTransactionDetailDTO();
                    showTransactionDetailDTO.setName(transactionDetail.getProduct().getName());
                    showTransactionDetailDTO.setPrice(transactionDetail.getProduct().getPrice());
                    showTransactionDetailDTO.setSeller(transactionDetail.getProduct().getUser().getName());
                    showTransactionDetailDTO.setImage(transactionDetail.getProduct().getImage());
                    showTransactionDetailDTO.setQuantity(transactionDetail.getQuantity());
                    return showTransactionDetailDTO;
                })
                .toList();
    }
}
