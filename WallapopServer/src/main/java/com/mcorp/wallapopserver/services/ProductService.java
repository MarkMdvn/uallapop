package com.mcorp.wallapopserver.services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mcorp.wallapopserver.DTO.BasicProductDTO;
import com.mcorp.wallapopserver.DTO.ProductDTO;
import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.models.Product.ItemCondition;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.repositories.CategoryRepository;
import com.mcorp.wallapopserver.repositories.ProductRepository;
import com.mcorp.wallapopserver.repositories.UserRepository;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

  private final ObjectMapper objectMapper;
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private UserRepository userRepository;

  public ProductService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Optional<Product> getProductById(Long id) {
    return productRepository.findById(id);
  }

  public Optional<Product> incrementViewCount(Long id) {
    Optional<Product> productOpt = productRepository.findById(id);
    if (productOpt.isPresent()) {
      Product product = productOpt.get();
      product.setViewCount(product.getViewCount() + 1);
      productRepository.save(product);
    }
    return productOpt;
  }

  @Transactional
  public Product saveProduct(Product product) {
    return productRepository.save(product);
  }

  // JSON methods

  @Transactional
  public void deleteProduct(Product product) {
    productRepository.delete(product);
  }

  @Transactional
  public Product createProduct(ProductDTO productDTO, String email) throws JsonProcessingException {
    Product product = objectMapper.convertValue(productDTO, Product.class);
    Category category = categoryRepository.findById(productDTO.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));
    product.setCategory(category);

    // Fetch user and set to product
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
    product.setUser(user);

    return productRepository.save(product);
  }

  // BasicProductDTO methods
  public List<BasicProductDTO> getLatestProductsByCategory(Long categoryId) {
    List<Product> products = productRepository.findTop16ByCategory_IdOrderByCreatedAtDesc(
        categoryId);
    return products.stream()
        .map(this::convertToBasicDTO)
        .collect(Collectors.toList());
  }

  private BasicProductDTO convertToBasicDTO(Product product) {
    BasicProductDTO dto = new BasicProductDTO();
    dto.setId(product.getId());
    dto.setTitle(product.getTitle());
    dto.setPrice(product.getPrice());
    dto.setShippingAvailable(product.isShippingAvailable());
    // Only taking the first image for simplicity
    dto.setImageUrls(product.getImageUrls().isEmpty() ? Collections.emptyList()
        : Collections.singletonList(product.getImageUrls().get(0)));
    return dto;
  }

  public List<Product> getProductsByUser(Long userId) {
    return productRepository.findByUserId(userId);
  }

  public List<Product> getProductsByUserId(Long userId) {
    return productRepository.findByUserId(userId);
  }
}
