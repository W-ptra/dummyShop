package com.dummyShop.dummyShop.utils;

import com.dummyShop.dummyShop.configuration.GeneralConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Validation {

    @Autowired
    private GeneralConfiguration generalConfiguration;

    public boolean isIdNotValid(Long id){
        return id < generalConfiguration.getID_DEFAULT_MIN() || id > generalConfiguration.getID_DEFAULT_MAX();
    }

    public boolean isPriceNotValid(Double price){
        return price < generalConfiguration.getPRICE_DEFAULT_MIN() || price > generalConfiguration.getPRICE_DEFAULT_MAX();
    }

    public <T> boolean  isListNotValid(List<T> tList){
        return tList.size() > generalConfiguration.getLIST_DEFAULT_LENGTH_MAX();
    }

    public boolean isStarNotValid(Double star){
        return star < generalConfiguration.getSTAR_DEFAULT_MIN() || star > generalConfiguration.getSTAR_DEFAULT_MAX();
    }
}
