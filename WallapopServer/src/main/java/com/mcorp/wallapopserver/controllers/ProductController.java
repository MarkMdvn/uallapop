package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.services.CategoryService;
import com.mcorp.wallapopserver.services.ProductService;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    return productService.getProductById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());

    // TODO get rid of the infinite hibernate loop
  }

  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody Product product,
      @RequestParam List<Long> categoryIds) {
    try {
      Set<Category> categories = new HashSet<>();
      for (Long categoryId : categoryIds) {
        Category category = categoryService.getCategoryById(categoryId).orElseThrow();
        categories.add(category);
      }
      product.setCategories(categories);
      Product savedProduct = productService.saveProduct(product);
      return ResponseEntity.ok(savedProduct);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).build();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable Long id,
      @RequestBody Product productDetails, @RequestParam List<Long> categoryIds) {
    try {
      Product product = productService.getProductById(id).orElseThrow();
      product.setTitle(productDetails.getTitle());
      product.setDescription(productDetails.getDescription());
      product.setPrice(productDetails.getPrice());
      product.setShippingAvailable(productDetails.isShippingAvailable());

      Set<Category> categories = new HashSet<>();
      for (Long categoryId : categoryIds) {
        Category category = categoryService.getCategoryById(categoryId).orElseThrow();
        categories.add(category);
      }
      product.setCategories(categories);

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
