package com.mcorp.wallapopserver.DTO;

import java.util.List;
import lombok.Data;

@Data
public class BasicProductDTO {
  private Long id;
  private String title;
  private Double price;
  private boolean shippingAvailable;
  private List<String> imageUrls; // Ensure only one or few are sent to minimize load
}