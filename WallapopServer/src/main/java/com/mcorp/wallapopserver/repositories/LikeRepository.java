package com.mcorp.wallapopserver.repositories;

import com.mcorp.wallapopserver.models.Like;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
  boolean existsByUserIdAndProductId(Long userId, Long productId);
  boolean existsByUserIdAndLikedUserId(Long userId, Long likedUserId);
  void deleteByUserIdAndProductId(Long userId, Long productId);
  void deleteByUserIdAndLikedUserId(Long userId, Long likedUserId);
  List<Like> findByUserIdAndProductIdNotNull(Long userId);
  List<Like> findByUserIdAndLikedUserIdNotNull(Long userId);
}