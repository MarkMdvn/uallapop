package com.mcorp.wallapopserver.services;

import com.mcorp.wallapopserver.models.Rating;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.repositories.RatingRepository;
import com.mcorp.wallapopserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RatingService {

  @Autowired
  private RatingRepository ratingRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional
  public Rating addRatingToUser(Long userId, Rating rating) {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    rating.setReviewedUser(user);
    return ratingRepository.save(rating);
  }

  public List<Rating> getRatingsByUser(Long userId) {
    return ratingRepository.findByReviewedUserId(userId);
  }
}
