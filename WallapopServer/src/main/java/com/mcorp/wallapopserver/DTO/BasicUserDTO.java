package com.mcorp.wallapopserver.DTO;

import com.mcorp.wallapopserver.models.Product.ProductStatus;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasicUserDTO {

  private Long id;
  private String name;
  private String email;
  private String location;
  private double averageRating;
  private int totalSales;
  private int totalPurchases;
  private int totalItemsShipped;
  private Set<Long> productIds;
  private byte[] profileImg;
  private ProductStatus productStatus;
}