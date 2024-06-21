package com.mcorp.wallapopserver.services;


import com.mcorp.wallapopserver.DTO.ProductDTO;
import com.mcorp.wallapopserver.models.Category;
import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.models.Product.ItemCondition;
import com.mcorp.wallapopserver.repositories.CategoryRepository;
import com.mcorp.wallapopserver.repositories.ProductRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {

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


  public Product createProduct(ProductDTO productDTO) {
    Product product = new Product();
    product.setTitle(productDTO.getTitle());
    product.setPrice(productDTO.getPrice());
    product.setDescription(productDTO.getDescription());
    product.setShippingAvailable(productDTO.isShippingAvailable());
    product.setItemCondition(ItemCondition.valueOf(productDTO.getItemCondition()));
    Category category = categoryRepository.findById(productDTO.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));
    product.setCategory(category);
    return productRepository.save(product);
  }
}
