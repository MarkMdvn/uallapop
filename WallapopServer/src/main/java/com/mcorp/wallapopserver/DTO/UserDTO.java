package com.mcorp.wallapopserver.DTO;

import java.util.List;
import lombok.Data;

@Data
public class UserDTO {
  private Long id;
  private String name;
  private String email;
  private String location;
  private double averageRating;
  private int totalSales;
  private int totalPurchases;
  private int totalItemsShipped;
  private byte[] profileImg;
  private List<Long> productIds;

}
