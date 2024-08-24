package com.taemin.afterbunner.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CartMapper {
    void getCartBy(String ff);
}
