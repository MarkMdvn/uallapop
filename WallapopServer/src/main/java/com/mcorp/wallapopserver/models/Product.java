package com.mcorp.wallapopserver.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

@Entity
@Data
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Title cannot be empty")
  private String title;

  @NotNull(message = "Price must be provided")
  @DecimalMin(value = "0.01", message = "Price must be positive")
  private Double price;

  @Column(length = 1000)
  private String description;

  private boolean shippingAvailable;

  @Enumerated(EnumType.STRING)
  @NotNull
  private ItemCondition itemCondition;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", nullable = false)
  @NotNull
  private Category category;


  @ElementCollection(fetch = FetchType.LAZY)
  private List<String> imageUrls;

  @JdbcTypeCode(SqlTypes.JSON)
  private Map<String, Object> attributes;

  @Column(updatable = false)
  @CreationTimestamp
  private Date createdAt;

  @UpdateTimestamp
  private Date updatedAt;

  private int viewCount;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  @JsonBackReference
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProductStatus productStatus = ProductStatus.ON_SELL;

  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<Like> productLikes = new ArrayList<>();




  public enum ProductStatus {
    ON_SELL, RESERVED, SOLD
  }

  public enum ItemCondition {
    NOT_OPENED, IN_THE_BOX, NEW, ALMOST_NEW, USED, POOR_CONDITION
  }
}

