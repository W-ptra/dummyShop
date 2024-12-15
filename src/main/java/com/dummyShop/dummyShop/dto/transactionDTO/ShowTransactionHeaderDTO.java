package com.dummyShop.dummyShop.dto.transactionDTO;

import com.dummyShop.dummyShop.model.TransactionHeader;
import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.Date;
import java.util.List;

public class ShowTransactionHeaderDTO {
    private Date date;
    @JsonAlias("list")
    private List<ShowTransactionDetailDTO> showTransactionDetailDTOList;
    private Double total;
    private String status;

    public ShowTransactionHeaderDTO(){}

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<ShowTransactionDetailDTO> getShowTransactionDetailDTOList() {
        return showTransactionDetailDTOList;
    }

    public void setShowTransactionDetailDTOList(List<ShowTransactionDetailDTO> showTransactionDetailDTOList) {
        this.showTransactionDetailDTOList = showTransactionDetailDTOList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static List<ShowTransactionHeaderDTO> convertToDTO(
            List<TransactionHeader> transactionHeaderList
    ){
        return transactionHeaderList.stream()
                .map(transaction -> {
                    ShowTransactionHeaderDTO showTransactionHeaderDTO = new ShowTransactionHeaderDTO();
                    showTransactionHeaderDTO.setDate(transaction.getDate());
                    showTransactionHeaderDTO.setStatus(transaction.getStatus());

                    showTransactionHeaderDTO
                            .setShowTransactionDetailDTOList(
                                    ShowTransactionDetailDTO.convertToDTO(
                                            transaction.getTransactionDetailList()
                                    )
                            );

                    showTransactionHeaderDTO.setTotal(transaction.getTotal());

                    return showTransactionHeaderDTO;
                })
                .toList();
    }
}
