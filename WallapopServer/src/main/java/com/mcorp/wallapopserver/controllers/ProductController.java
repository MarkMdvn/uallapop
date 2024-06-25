package com.mcorp.wallapopserver.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mcorp.wallapopserver.DTO.ProductDTO;
import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.services.CategoryService;
import com.mcorp.wallapopserver.services.FileStorageService;
import com.mcorp.wallapopserver.services.ProductService;
import com.mcorp.wallapopserver.utils.UrlUtil;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductService productService;
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private ObjectMapper objectMapper;
  @Autowired
  private FileStorageService fileStorageService;

  @GetMapping("/all-products")
  public List<ProductDTO> getAllProducts() {
    List<Product> products = productService.getAllProducts();
    return products.stream()
        .map(this::convertToDTO)  // Ensure every product is converted to DTO with proper URLs
        .collect(Collectors.toList());
  }

  private ProductDTO convertToDTO(Product product) {
    ProductDTO dto = new ProductDTO();
    dto.setId(product.getId());
    dto.setTitle(product.getTitle());
    dto.setPrice(product.getPrice());
    dto.setDescription(product.getDescription());
    dto.setShippingAvailable(product.isShippingAvailable());
    dto.setItemCondition(String.valueOf(product.getItemCondition()));
    if (product.getCategory() != null) {
      dto.setCategoryId(product.getCategory().getId());
    }

    // Directly use the image URLs as stored in the database
    dto.setImageUrls(product.getImageUrls());

    return dto;
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
    return productService.getProductById(id)
        .map(product -> ResponseEntity.ok(
            convertToDTO(product))) // This returns ResponseEntity<ProductDTO>
        .orElseGet(() -> ResponseEntity.<ProductDTO>notFound()
            .build()); // Ensure this returns ResponseEntity<ProductDTO> as well
  }

  @PostMapping("/create-product")
  public ResponseEntity<?> createProduct(
      @RequestParam("product") String productJson,
      @RequestParam("images") MultipartFile[] files) {
    try {
      ProductDTO productDTO = objectMapper.readValue(productJson, ProductDTO.class);
      Product product = productService.createProduct(productDTO);

      // Store the images and update product with image URLs using UrlUtil
      List<String> storedFileNames = fileStorageService.storeFiles(files, product.getId());
      List<String> imageUrls = storedFileNames.stream()
          .map(filename -> UrlUtil.createImageUrl(filename))  // Ensure this is the correct path
          .collect(Collectors.toList());
      product.setImageUrls(imageUrls);
      productService.saveProduct(product);

      return ResponseEntity.ok(convertToDTO(product));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Failed to create product with images");
    }
  }

  @PutMapping("/edit-product/{id}")
  public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
      @RequestBody ProductDTO productDTO) {
    try {
      Product product = productService.getProductById(id)
          .orElseThrow(() -> new RuntimeException("Product not found"));
      product.setTitle(productDTO.getTitle());
      product.setDescription(productDTO.getDescription());
      product.setPrice(productDTO.getPrice());
      product.setShippingAvailable(productDTO.isShippingAvailable());
      Category category = categoryService.getCategoryById(productDTO.getCategoryId())
          .orElseThrow(() -> new RuntimeException("Category not found"));
      product.setCategory(category);
      Product updatedProduct = productService.saveProduct(product);
      return ResponseEntity.ok(convertToDTO(updatedProduct));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    try {
      Product product = productService.getProductById(id).orElseThrow();
      productService.deleteProduct(product);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).build();
    }
  }
}
