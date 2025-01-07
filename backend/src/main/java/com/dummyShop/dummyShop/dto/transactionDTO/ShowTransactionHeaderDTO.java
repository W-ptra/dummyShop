package com.dummyShop.dummyShop.dto.transactionDTO;

import com.dummyShop.dummyShop.model.TransactionHeader;
import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.Date;
import java.util.List;

public class ShowTransactionHeaderDTO {

    private Long id;
    private Date date;
    @JsonAlias("list")
    private List<ShowTransactionDetailDTO> list;
    private Double total;
    private String status;

    public ShowTransactionHeaderDTO(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public List<ShowTransactionDetailDTO> getlist() {
        return list;
    }

    public void setlist(List<ShowTransactionDetailDTO> showTransactionDetailDTOList) {
        this.list = showTransactionDetailDTOList;
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
                    showTransactionHeaderDTO.setId(transaction.getId());
                    showTransactionHeaderDTO.setDate(transaction.getDate());
                    showTransactionHeaderDTO.setStatus(transaction.getStatus());

                    showTransactionHeaderDTO
                            .setlist(
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
