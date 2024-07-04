package com.mcorp.wallapopserver.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;

  @JsonIgnore
  @ManyToMany(mappedBy = "roles")
  private Collection<User> users = new HashSet<>();

  public Role(String name) {
    this.name = name;
  }

  public void assignRoleToUser(User user) {
    user.getRoles().add(this);
    this.getUsers().add(user);
  }

  public void removeUserFromRole(User user) {
    user.getRoles().remove(this);
    this.getUsers().remove(user);

  }

  public void removeAllUsersFromRole() {
    if (this.getUsers() != null) {
      List<User> roleUsers = this.getUsers().stream().toList();
      roleUsers.forEach(this::removeUserFromRole);
    }
  }

  public String getName() {
    return name != null ? name : "";
  }
}