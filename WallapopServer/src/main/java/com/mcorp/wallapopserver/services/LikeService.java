package com.mcorp.wallapopserver.services;

import com.mcorp.wallapopserver.DTO.BasicProductDTO;
import com.mcorp.wallapopserver.DTO.ProductDTO;
import com.mcorp.wallapopserver.models.Like;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.repositories.LikeRepository;
import com.mcorp.wallapopserver.repositories.ProductRepository;
import com.mcorp.wallapopserver.repositories.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LikeService {

  @Autowired
  private LikeRepository likeRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;

  public void likeProduct(Long userId, Long productId) throws Exception {
    if (!likeRepository.existsByUserIdAndProductId(userId, productId)) {
      Like like = new Like();
      like.setUser(userRepository.findById(userId)
          .orElseThrow(() -> new Exception("User not found")));
      like.setProduct(productRepository.findById(productId)
          .orElseThrow(() -> new Exception("Product not found")));
      likeRepository.save(like);
    }
  }

  public void likeUser(Long userId, Long likedUserId) throws Exception {
    if (!likeRepository.existsByUserIdAndLikedUserId(userId, likedUserId)) {
      Like like = new Like();
      like.setUser(userRepository.findById(userId)
          .orElseThrow(() -> new Exception("User not found")));
      like.setLikedUser(userRepository.findById(likedUserId)
          .orElseThrow(() -> new Exception("Liked user not found")));
      likeRepository.save(like);
    }
  }

  public void unlikeProduct(Long userId, Long productId) {
    likeRepository.deleteByUserIdAndProductId(userId, productId);
  }

  public void unlikeUser(Long userId, Long likedUserId) {
    likeRepository.deleteByUserIdAndLikedUserId(userId, likedUserId);
  }

  public List<BasicProductDTO> getLikedProducts(Long userId) {
    return likeRepository.findByUserIdAndProductIdNotNull(userId).stream()
        .map(this::convertToBasicDTO)
        .collect(Collectors.toList());
  }

  private BasicProductDTO convertToBasicDTO(Like like) {
    Product product = like.getProduct();
    BasicProductDTO dto = new BasicProductDTO();
    dto.setId(product.getId());
    dto.setTitle(product.getTitle());
    dto.setPrice(product.getPrice());
    dto.setImageUrls(product.getImageUrls());
    dto.setCreatedAt(product.getCreatedAt());
    dto.setUpdatedAt(product.getUpdatedAt());
    dto.setProductStatus(product.getProductStatus());

    return dto;
  }

  public List<User> getLikedUsers(Long userId) {
    return likeRepository.findByUserIdAndLikedUserIdNotNull(userId).stream()
        .map(Like::getLikedUser)
        .collect(Collectors.toList());
  }


  public boolean isProductLikedByUser(Long productId, Long userId) {
    return likeRepository.existsByUserIdAndProductId(userId, productId);
  }

  public int countLikesByProductId(Long productId) {
    return likeRepository.countByProductId(productId);
  }

}
