package com.mcorp.wallapopserver.services;

import com.mcorp.wallapopserver.exceptions.RoleAlreadyExistException;
import com.mcorp.wallapopserver.exceptions.UserAlreadyExistsException;
import com.mcorp.wallapopserver.models.Role;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.repositories.RoleRepository;
import com.mcorp.wallapopserver.repositories.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RoleService  {

  private final RoleRepository roleRepository;
  private final UserRepository userRepository;

  public List<Role> getRoles() {
    return roleRepository.findAll();
  }

  public Role createRole(Role theRole) {
    String roleName = "ROLE_" + theRole.getName().toUpperCase();
    Role role = new Role(roleName);
    if (roleRepository.existsByName(roleName)) {
      throw new RoleAlreadyExistException(theRole.getName() + " role already exists");
    }
    return roleRepository.save(role);
  }

  public void deleteRole(Long roleId) {
    this.removeAllUsersFromRole(roleId);
    roleRepository.deleteById(roleId);
  }

  public Role findByName(String name) {
    return roleRepository.findByName(name).get();
  }

  public User removeUserFromRole(Long userId, Long roleId) {
    Optional<User> user = userRepository.findById(userId);
    Optional<Role> role = roleRepository.findById(roleId);
    if (role.isPresent() && role.get().getUsers().contains(user.get())) {
      role.get().removeUserFromRole(user.get());
      roleRepository.save(role.get());
      return user.get();
    }
    throw new UsernameNotFoundException("User not found");
  }

  public User assignRoleToUser(Long userId, Long roleId) {
    Optional<User> user = userRepository.findById(userId);
    Optional<Role> role = roleRepository.findById(roleId);
    if (user.isPresent() && user.get().getRoles().contains(role.get())) {
      throw new UserAlreadyExistsException(
          user.get().getName() + " is already assigned to the" + role.get().getName()
              + " role");
    }
    if (role.isPresent()) {
      role.get().assignRoleToUser(user.get());
      roleRepository.save(role.get());
    }
    return user.get();
  }

  public Role removeAllUsersFromRole(Long roleId) {
    Optional<Role> role = roleRepository.findById(roleId);
    role.ifPresent(Role::removeAllUsersFromRole);
    return roleRepository.save(role.get());
  }
}