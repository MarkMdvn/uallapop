package com.mcorp.wallapopserver.DTO.product;

import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class ProductDetailDTO extends ProductListDTO {
  private String description;
  private List<String> images; // URLs to detailed images
  private Map<String, String> attributes;
  // Additional fields as needed
}