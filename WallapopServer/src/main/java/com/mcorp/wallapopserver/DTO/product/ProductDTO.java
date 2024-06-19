package com.mcorp.wallapopserver.DTO.product;

import java.util.Map;
import lombok.Data;

@Data
public class ProductDTO {
  private Long id;
  private String title;
  private double price;
  private Long categoryId;
  private Map<String, String> attributes;
}