package com.dummyShop.dummyShop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Date;
import  java.util.List;

@Entity
@Table(name = "transaction_headers")
public class TransactionHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private Double total;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "transactionHeader",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<TransactionDetail> transactionDetailList;

    public TransactionHeader(){}

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<TransactionDetail> getTransactionDetailList() {
        return transactionDetailList;
    }

    public void setTransactionDetailList(List<TransactionDetail> transactionDetailList) {
        this.transactionDetailList = transactionDetailList;
    }
}
