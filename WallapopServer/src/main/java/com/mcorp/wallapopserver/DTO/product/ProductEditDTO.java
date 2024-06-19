package com.mcorp.wallapopserver.DTO.product;


import java.util.Map;
import lombok.Data;

@Data
public class ProductEditDTO {
  private Long id;
  private String title;
  private Double price;
  private String description;
  private Map<String, String> attributes; // Editable attributes
  // Exclude non-editable fields like 'postedAt'
}