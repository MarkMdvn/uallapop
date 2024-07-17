package com.mcorp.wallapopserver.DTO;

import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.models.Product.ProductStatus;
import java.util.Date;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ProductDTO {

  private Long id;
  private String title;
  private Double price;
  private String description;
  private boolean shippingAvailable;
  private String itemCondition;
  private Long categoryId;
  private String categoryName;
  private Map<String, Object> attributes;
  private List<String> imageUrls;
  private Date createdAt;
  private Date updatedAt;
  private int viewCount;
  private Long userId;
  private ProductStatus productStatus = ProductStatus.ON_SELL;

}