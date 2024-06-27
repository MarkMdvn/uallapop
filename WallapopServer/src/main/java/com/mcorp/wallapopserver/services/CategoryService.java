package com.mcorp.wallapopserver.services;

import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.repositories.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  public Optional<Category> getCategoryById(Long id) {
    return categoryRepository.findById(id);
  }

  public Category saveCategory(Category category) {
    return categoryRepository.save(category);
  }

  // Category division
  public List<Category> listMainCategories() {
    return categoryRepository.findByParentCategoryIsNull();
  }

  public List<Category> listSubCategories(Long parentId) {
    Category parent = categoryRepository.findById(parentId)
        .orElseThrow(() -> new RuntimeException("Category not found"));
    return categoryRepository.findByParentCategory(parent);
  }

}