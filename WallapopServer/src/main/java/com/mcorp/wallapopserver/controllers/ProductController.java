package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.DTO.product.ProductDTO;
import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.repositories.CategoryRepository;
import com.mcorp.wallapopserver.repositories.ProductRepository;
import com.mcorp.wallapopserver.services.CategoryService;
import com.mcorp.wallapopserver.services.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductService productService;

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private ProductRepository productRepository;

  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    return productService.getProductById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());

  }

  @PostMapping("/create-product")
  public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
    Category category = categoryRepository.findById(productDTO.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));

    Product newProduct = new Product();
    newProduct.setTitle(productDTO.getTitle());
    newProduct.setPrice(productDTO.getPrice());
    newProduct.setCategory(category);
    newProduct.setAttributes(productDTO.getAttributes());

    return ResponseEntity.ok(productRepository.save(newProduct));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable Long id,
      @RequestBody Product productDetails,
      @RequestParam Long categoryId) {
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
