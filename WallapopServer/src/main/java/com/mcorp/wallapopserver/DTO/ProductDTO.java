package com.mcorp.wallapopserver.DTO;

import java.util.List;
import lombok.Data;

@Data
public class ProductDTO {
  private Long id;
  private String title;
  private Double price;
  private String description;
  private boolean shippingAvailable;
  private String itemCondition;
  private Long categoryId;
  private List<String> imageUrls;
}