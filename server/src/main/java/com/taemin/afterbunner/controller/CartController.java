package com.taemin.afterbunner.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class CartController {

    @GetMapping("/")
    public String getCart() {
        return "cart";
    }
    @PutMapping("/item")
    public String addCartItem() {
        return "cart";
    }

}
