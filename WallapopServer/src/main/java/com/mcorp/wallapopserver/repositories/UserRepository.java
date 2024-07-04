package com.mcorp.wallapopserver.repositories;

import com.mcorp.wallapopserver.models.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  boolean existsByEmail(String email);

  void deleteByEmail(String email);

  Optional<User> findByEmail(String email);
}