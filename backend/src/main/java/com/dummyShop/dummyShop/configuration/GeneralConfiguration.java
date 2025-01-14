package com.dummyShop.dummyShop.configuration;

import org.springframework.context.annotation.Configuration;

@Configuration
public class GeneralConfiguration {

    private final int PAGINATION_SIZE = 20;

    private final Double PRICE_DEFAULT_MIN = 1.0;
    private final Double PRICE_DEFAULT_MAX = 999999.99;

    private final Long ID_DEFAULT_MIN = 1L;
    private final Long ID_DEFAULT_MAX = 999999999999L;

    private final int LIST_DEFAULT_LENGTH_MAX = 999;

    private final Double STAR_DEFAULT_MIN = 1.0;
    private final Double STAR_DEFAULT_MAX = 5.0;

    public GeneralConfiguration(){}

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

    public int getLIST_DEFAULT_LENGTH_MAX() {
        return LIST_DEFAULT_LENGTH_MAX;
    }

    public Double getSTAR_DEFAULT_MIN() {
        return STAR_DEFAULT_MIN;
    }

    public Double getSTAR_DEFAULT_MAX() {
        return STAR_DEFAULT_MAX;
    }

    public int getPAGINATION_SIZE() {
        return PAGINATION_SIZE;
    }
}
