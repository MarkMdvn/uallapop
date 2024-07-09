package com.mcorp.wallapopserver.DTO;

import com.mcorp.wallapopserver.models.Product.ProductStatus;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class BasicProductDTO {
  private Long id;
  private String title;
  private Double price;
  private boolean shippingAvailable;
  private List<String> imageUrls;
  private Date createdAt;
  private Date updatedAt;
  private ProductStatus productStatus;
}