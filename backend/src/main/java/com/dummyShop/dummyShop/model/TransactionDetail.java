package com.dummyShop.dummyShop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "transaction_details")
public class TransactionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "transaction_header_id",nullable = false)
    @JsonBackReference
    private TransactionHeader transactionHeader;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    @JsonBackReference
    private Product product;

    @OneToOne(mappedBy = "transactionDetail",cascade = CascadeType.ALL)
    @JsonManagedReference
    private Review review;

    private boolean isReviewed;

    public TransactionDetail(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public TransactionHeader getTransactionHeader() {
        return transactionHeader;
    }

    public void setTransactionHeader(TransactionHeader transactionHeader) {
        this.transactionHeader = transactionHeader;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public boolean isReviewed() {
        return isReviewed;
    }

    public void setReviewed(boolean reviewed) {
        isReviewed = reviewed;
    }
}
