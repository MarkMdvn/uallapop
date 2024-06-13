package com.mcorp.wallapopserver.services;

import com.mcorp.wallapopserver.models.Product;
import com.mcorp.wallapopserver.repositories.ProductRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

public interface IProductService {

  public List<Product> getAllProducts();
  public Product saveProduct(Product product);
}
