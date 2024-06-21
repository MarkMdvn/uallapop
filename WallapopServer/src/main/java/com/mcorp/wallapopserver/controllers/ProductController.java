package com.mcorp.wallapopserver.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.mcorp.wallapopserver.DTO.ProductDTO;
import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.services.CategoryService;
import com.mcorp.wallapopserver.services.FileStorageService;
import com.mcorp.wallapopserver.services.ProductService;
import java.util.List;
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
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    return productService.getProductById(id).map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/create-product")
  public ResponseEntity<?> createProduct(
      @RequestParam("product") String productJson,
      @RequestParam("images") MultipartFile[] files) {
    try {
      // Deserialize JSON string to ProductDTO
      ProductDTO productDTO = objectMapper.readValue(productJson, ProductDTO.class);

      // Handle the product creation logic
      Product product = productService.createProduct(productDTO);

      // Store the images and update product with image URLs
      List<String> imageUrls = fileStorageService.storeFiles(files, product.getId());
      product.setImageUrls(imageUrls);

      // Save the updated product information
      productService.saveProduct(product);

      return ResponseEntity.ok(product);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Failed to create product with images");
    }
  }


  @PutMapping("edit-products/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable Long id,
      @RequestBody Product productDetails, @RequestParam Long categoryId) {
    try {
      Product product = productService.getProductById(id)
          .orElseThrow(() -> new RuntimeException("Product not found"));

      product.setTitle(productDetails.getTitle());
      product.setDescription(productDetails.getDescription());
      product.setPrice(productDetails.getPrice());
      product.setShippingAvailable(productDetails.isShippingAvailable());

      Category category = categoryService.getCategoryById(categoryId)
          .orElseThrow(() -> new RuntimeException("Category not found"));
      product.setCategory(category);

      Product updatedProduct = productService.saveProduct(product);
      return ResponseEntity.ok(updatedProduct);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).build();
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
