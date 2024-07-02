package com.mcorp.wallapopserver.services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mcorp.wallapopserver.DTO.BasicProductDTO;
import com.mcorp.wallapopserver.DTO.ProductDTO;
import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.models.Product.ItemCondition;
import com.mcorp.wallapopserver.repositories.CategoryRepository;
import com.mcorp.wallapopserver.repositories.ProductRepository;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private CategoryRepository categoryRepository;

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Optional<Product> getProductById(Long id) {
    return productRepository.findById(id);
  }

  public Product saveProduct(Product product) {
    return productRepository.save(product);
  }

  public void deleteProduct(Product product) {
    productRepository.delete(product);
  }


  public Product createProduct(ProductDTO productDTO) throws JsonProcessingException {
    Product product = new Product();
    product.setTitle(productDTO.getTitle());
    product.setPrice(productDTO.getPrice());
    product.setDescription(productDTO.getDescription());
    product.setShippingAvailable(productDTO.isShippingAvailable());
    product.setItemCondition(ItemCondition.valueOf(productDTO.getItemCondition()));
    Category category = categoryRepository.findById(productDTO.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));
    product.setCategory(category);
    product.setAttributes(productDTO.getAttributes());

    return productRepository.save(product);
  }

  // JSON methods

  private final ObjectMapper objectMapper;
  public ProductService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  // BasicProductDTO methods
  public List<BasicProductDTO> getLatestProductsByCategory(Long categoryId) {
    List<Product> products = productRepository.findTop16ByCategory_IdOrderByCreatedAtDesc(categoryId);
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
    dto.setImageUrls(product.getImageUrls().isEmpty() ? Collections.emptyList() : Collections.singletonList(product.getImageUrls().get(0)));
    return dto;
  }
}
