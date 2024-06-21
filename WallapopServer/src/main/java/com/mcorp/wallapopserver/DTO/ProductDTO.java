package com.mcorp.wallapopserver.DTO;

import java.util.List;
import lombok.Data;

@Data
public class ProductDTO {
  private String title;
  private Double price;
  private String description;
  private boolean shippingAvailable;
  private String itemCondition; // Use String to accept the enum value from JSON
  private Long categoryId; // This will be used to link the Product to a Category
  private List<String> imageURLs;
}