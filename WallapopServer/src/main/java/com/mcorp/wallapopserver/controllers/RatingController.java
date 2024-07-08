package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.models.Rating;
import com.mcorp.wallapopserver.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

  @Autowired
  private RatingService ratingService;

  // POST endpoint to add a rating to a user
  @PostMapping("/add")
  public ResponseEntity<?> addRating(@RequestBody Rating rating, @RequestParam("userId") Long userId) {
    try {
      Rating createdRating = ratingService.addRatingToUser(userId, rating);
      return ResponseEntity.ok(createdRating);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error adding rating: " + e.getMessage());
    }
  }

  // GET endpoint to retrieve all ratings for a specific user
  @GetMapping("/user/{userId}")
  public ResponseEntity<?> getRatingsByUser(@PathVariable Long userId) {
    try {
      var ratings = ratingService.getRatingsByUser(userId);
      return ResponseEntity.ok(ratings);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error retrieving ratings: " + e.getMessage());
    }
  }
}
