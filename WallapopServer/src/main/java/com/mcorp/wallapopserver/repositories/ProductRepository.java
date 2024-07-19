package com.mcorp.wallapopserver.repositories;

import com.mcorp.wallapopserver.models.Product;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> findTop16ByCategory_IdOrderByCreatedAtDesc(Long categoryId);
  Page<Product> findByCategory_IdOrderByCreatedAtDesc(Long categoryId, Pageable pageable);

  Page<Product> findAllByOrderByCreatedAtDesc(Pageable pageable);



  List<Product> findByUserId(Long userId);


}
