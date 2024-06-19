package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
  @Autowired
  private CategoryRepository categoryRepository;

  // Fetch attributes schema for a category
  @GetMapping("/{id}/attributes")
  public ResponseEntity<String> getCategoryAttributes(@PathVariable Long id) {
    Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found"));
    return ResponseEntity.ok(category.getAttributesSchema());
  }
}
