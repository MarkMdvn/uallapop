package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.DTO.CategoryDTO;
import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.services.CategoryService;
import java.util.List;
import java.util.stream.Collectors;
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

  @GetMapping("/all-categories")
  public List<CategoryDTO> getMainCategories() {
    List<Category> categories = categoryService.getAllCategories();
    return categories.stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }


  private CategoryDTO convertToDTO(Category category) {
    CategoryDTO dto = new CategoryDTO();
    dto.setId(category.getId());
    dto.setName(category.getName());
    return dto;
  }
}
