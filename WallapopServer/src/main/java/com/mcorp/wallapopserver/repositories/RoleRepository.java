package com.mcorp.wallapopserver.repositories;


import com.mcorp.wallapopserver.models.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

  Optional<Role> findByName(String role);


  boolean existsByName(String role);
}