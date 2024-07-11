package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.security.user.WallapopUserDetails;
import com.mcorp.wallapopserver.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

  @Autowired
  private LikeService likeService;

  @PostMapping("/product/{productId}")
  public ResponseEntity<?> likeProduct(@AuthenticationPrincipal WallapopUserDetails currentUser,
      @PathVariable Long productId) {
    try {
      likeService.likeProduct(currentUser.getId(), productId);
      return ResponseEntity.ok().body("Product liked successfully.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/user/{likedUserId}")
  public ResponseEntity<?> likeUser(@AuthenticationPrincipal WallapopUserDetails currentUser,
      @PathVariable Long likedUserId) {
    try {
      likeService.likeUser(currentUser.getId(), likedUserId);
      return ResponseEntity.ok().body("User liked successfully.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @DeleteMapping("/product/{productId}")
  public ResponseEntity<?> unlikeProduct(@AuthenticationPrincipal WallapopUserDetails currentUser,
      @PathVariable Long productId) {
    try {
      likeService.unlikeProduct(currentUser.getId(), productId);
      return ResponseEntity.ok().body("Product unliked successfully.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error unliking product.");
    }
  }

  @DeleteMapping("/user/{likedUserId}")
  public ResponseEntity<?> unlikeUser(@AuthenticationPrincipal WallapopUserDetails currentUser,
      @PathVariable Long likedUserId) {
    try {
      likeService.unlikeUser(currentUser.getId(), likedUserId);
      return ResponseEntity.ok().body("User unliked successfully.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error unliking user.");
    }
  }

  @GetMapping("/products")
  public ResponseEntity<?> getLikedProducts(
      @AuthenticationPrincipal WallapopUserDetails currentUser) {
    try {
      return ResponseEntity.ok().body(likeService.getLikedProducts(currentUser.getId()));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error retrieving liked products.");
    }
  }

  @GetMapping("/users")
  public ResponseEntity<?> getLikedUsers(@AuthenticationPrincipal WallapopUserDetails currentUser) {
    try {
      return ResponseEntity.ok().body(likeService.getLikedUsers(currentUser.getId()));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error retrieving liked users.");
    }
  }

  @GetMapping("/check-product/{productId}")
  public ResponseEntity<?> checkProductLike(
      @PathVariable Long productId,
      @AuthenticationPrincipal WallapopUserDetails userDetails) {
    if (userDetails == null) {
      return ResponseEntity.badRequest().body("User must be logged in to check like status");
    }

    Long userId = userDetails.getId();
    boolean isLiked = likeService.isProductLikedByUser(productId, userId);
    return ResponseEntity.ok().body(new LikeStatusDTO(isLiked));
  }

  @GetMapping("/product/{productId}/count")
  public ResponseEntity<?> getCountOfLikes(@PathVariable Long productId) {
    try {
      int count = likeService.countLikesByProductId(productId);
      return ResponseEntity.ok().body(new LikeCountDTO(count));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Failed to get like count: " + e.getMessage());
    }
  }

  static class LikeCountDTO {

    private int count;

    public LikeCountDTO(int count) {
      this.count = count;
    }

    public int getCount() {
      return count;
    }

    public void setCount(int count) {
      this.count = count;
    }
  }

  static class LikeStatusDTO {

    private boolean liked;

    public LikeStatusDTO(boolean liked) {
      this.liked = liked;
    }

    public boolean isLiked() {
      return liked;
    }

    public void setLiked(boolean liked) {
      this.liked = liked;
    }
  }
}
