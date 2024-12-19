package com.dummyShop.dummyShop.configuration;

import org.springframework.context.annotation.Configuration;

@Configuration
public class GeneralConfiguration {

    private final int PAGINATION_DEFAULT_PAGE = 0;
    private final int PAGINATION_DEFAULT_SIZE = 10;

    private final Double PRICE_DEFAULT_MIN = 1.0;
    private final Double PRICE_DEFAULT_MAX = 999999.99;

    private final Long ID_DEFAULT_MIN = 1L;
    private final Long ID_DEFAULT_MAX = 999999999999L;

    private final int LIST_LENGTH_MAX = 999;

    public GeneralConfiguration(){}

    public int getPAGINATION_DEFAULT_PAGE() {
        return PAGINATION_DEFAULT_PAGE;
    }

    public int getPAGINATION_DEFAULT_SIZE() {
        return PAGINATION_DEFAULT_SIZE;
    }

    public Double getPRICE_DEFAULT_MIN() {
        return PRICE_DEFAULT_MIN;
    }

    public Double getPRICE_DEFAULT_MAX() {
        return PRICE_DEFAULT_MAX;
    }

    public Long getID_DEFAULT_MIN() {
        return ID_DEFAULT_MIN;
    }

    public Long getID_DEFAULT_MAX() {
        return ID_DEFAULT_MAX;
    }

    public int getLIST_LENGTH_MAX() {
        return LIST_LENGTH_MAX;
    }
}
