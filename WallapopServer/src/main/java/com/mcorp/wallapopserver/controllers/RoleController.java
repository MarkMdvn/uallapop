package com.mcorp.wallapopserver.controllers;

import static org.springframework.http.HttpStatus.FOUND;

import com.mcorp.wallapopserver.exceptions.RoleAlreadyExistException;
import com.mcorp.wallapopserver.models.Role;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.services.RoleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/roles")
@RequiredArgsConstructor
public class RoleController {

  @Autowired
  private final RoleService roleService;

  @GetMapping()
  public ResponseEntity<List<Role>> getAllRoles(){
    return new ResponseEntity<>(roleService.getRoles(), FOUND);
  }

  @PostMapping()
  public ResponseEntity<String> createRole(@RequestBody Role theRole){
    try{
      roleService.createRole(theRole);
      return ResponseEntity.ok("New role created successfully!");
    }catch(RoleAlreadyExistException re){
      return ResponseEntity.status(HttpStatus.CONFLICT).body(re.getMessage());

    }
  }
  @DeleteMapping("/delete/{roleId}")
  public void deleteRole(@PathVariable("roleId") Long roleId){
    roleService.deleteRole(roleId);

  }
  @PostMapping("/remove-all-users-from-role/{roleId}")
  public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId){
    return roleService.removeAllUsersFromRole(roleId);
  }

  @PostMapping("/remove-user-from-role")
  public User removeUserFromRole(
      @RequestParam("userId") Long userId,
      @RequestParam("roleId") Long roleId){
    return roleService.removeUserFromRole(userId, roleId);
  }
  @PostMapping("/assign-user-to-role")
  public User assignUserToRole(
      @RequestParam("userId") Long userId,
      @RequestParam("roleId") Long roleId){
    return roleService.assignRoleToUser(userId, roleId);
  }
}