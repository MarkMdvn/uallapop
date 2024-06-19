package com.mcorp.wallapopserver.models;

import jakarta.persistence.CollectionTable;
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
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.transaction.Transaction;
import java.time.LocalDate;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import lombok.Data;

@Entity
@Data
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private Double Price;
  private String description;
  private boolean shippingAvailable;
  private Integer views;
  private LocalDate postedAt;

  // CONDITION OF THE PRODUCT
  @Enumerated(EnumType.STRING)
  private ItemCondition itemCondition;

  // TODO imageUrls and photos


  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @ElementCollection
  @CollectionTable(name = "product_attributes", joinColumns = @JoinColumn(name = "product_id"))
  @MapKeyColumn(name = "attribute_key")
  @Column(name = "attribute_value")
  private Map<String, String> attributes;


  public enum ItemCondition {
    NOT_OPENED, IN_THE_BOX, NEW, ALMOST_NEW, USED, POOR_CONDITION
  }



}