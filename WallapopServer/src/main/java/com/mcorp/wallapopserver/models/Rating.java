package com.mcorp.wallapopserver.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Rating {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private double rating;
  private String comment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reviewed_user_id")
  private User reviewedUser;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reviewer_user_id")
  private User reviewer;
}
