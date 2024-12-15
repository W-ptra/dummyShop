package com.dummyShop.dummyShop.dto.transactionDTO;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.List;

public class CreateTransactionHeaderDTO {

    @JsonAlias("details")
    private List<CreateTransactionDetailDTO> transactionDetailDTOList;

    public  CreateTransactionHeaderDTO(){}

    public List<CreateTransactionDetailDTO> getTransactionDetailDTOList() {
        return transactionDetailDTOList;
    }

    public void setTransactionDetailDTOList(List<CreateTransactionDetailDTO> transactionDetailDTOList) {
        this.transactionDetailDTOList = transactionDetailDTOList;
    }


}
