package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.services.CategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @GetMapping("/main")
  public ResponseEntity<List<Category>> getMainCategories() {
    return ResponseEntity.ok(categoryService.listMainCategories());
  }

  @GetMapping("/{parentId}/subcategories")
  public ResponseEntity<List<Category>> getSubCategories(@PathVariable Long parentId) {
    return ResponseEntity.ok(categoryService.listSubCategories(parentId));
  }


}
