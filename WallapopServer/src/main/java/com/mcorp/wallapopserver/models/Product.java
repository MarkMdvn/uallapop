package com.mcorp.wallapopserver.models;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Data;

@Entity
@Data
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String title;

  @NotNull(message = "Price must be provided")
  @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
  private Double price;

  private String description;

  private boolean shippingAvailable;

  @Enumerated(EnumType.STRING)
  @NotNull
  private ItemCondition itemCondition;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  @NotNull
  private Category category;

  @ElementCollection(fetch = FetchType.LAZY)
  private List<String> imageUrls;

  @Column(columnDefinition = "json")
  private String attributes;

  public enum ItemCondition {
    NOT_OPENED, IN_THE_BOX, NEW, ALMOST_NEW, USED, POOR_CONDITION
  }
}
