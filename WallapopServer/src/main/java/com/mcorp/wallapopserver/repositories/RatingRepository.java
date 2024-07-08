package com.mcorp.wallapopserver.repositories;

import com.mcorp.wallapopserver.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
  List<Rating> findByReviewedUserId(Long userId);
}