package com.mcorp.wallapopserver.DTO.product;

import lombok.Data;

@Data
public class ProductListDTO {
  private Long id;
  private String title;
  private String thumbnail;
  private Double price;
  private String categoryName;
}