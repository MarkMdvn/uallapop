package com.mcorp.wallapopserver.DTO.product;


import java.time.LocalDateTime;
import lombok.Data;

@Data
public class FullProductDTO extends ProductDetailDTO {
  private Integer views;
  private LocalDateTime postedAt;
  private String itemCondition;
  // All other fields
}