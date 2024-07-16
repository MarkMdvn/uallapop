package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.DTO.BasicUserDTO;
import com.mcorp.wallapopserver.DTO.UserDTO;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.services.UserService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping()
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<List<User>> getUsers(){
    return new ResponseEntity<>(userService.getUsers(), HttpStatus.FOUND);
  }

  @GetMapping("/by-email/{email}")
  public ResponseEntity<BasicUserDTO> getBasicUserByEmail(@PathVariable String email) {
    return userService.findUserByEmail(email)
        .map(this::convertToDto)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

//  @GetMapping("complete-user/{id}") // TODO does a infinite loop with userId -> product List
//  public ResponseEntity<?> getUserById(@PathVariable("id") Long id){
//    try{
//      Optional<User> theUser = userService.findUserById(id);
//      return ResponseEntity.ok(theUser);
//    }catch (UsernameNotFoundException e){
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//    }catch (Exception e){
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
//    }
//  }

  @GetMapping("complete-user/{userId}")
  public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
    UserDTO userDTO = userService.getUserById(userId);
    if (userDTO == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(userDTO);
  }



  // Basic user info:
  @GetMapping("/{id}")
  public ResponseEntity<BasicUserDTO> getBasicUserById(@PathVariable Long id) {
    return userService.findUserById(id)
        .map(user -> convertToDto(user))
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  private BasicUserDTO convertToDto(User user) {
    BasicUserDTO dto = new BasicUserDTO();
    dto.setId(user.getId());
    dto.setName(user.getName());
    dto.setEmail(user.getEmail());
    dto.setLocation(user.getLocation());
    dto.setAverageRating(user.getAverageRating());
    dto.setTotalSales(user.getTotalSales());
    dto.setTotalPurchases(user.getTotalPurchases());
    dto.setTotalItemsShipped(user.getTotalItemsShipped());
    dto.setProfileImg(user.getProfileImage());
    return dto;
  }


  @DeleteMapping("/{userId}")
  @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email == principal.username)")
  public ResponseEntity<String> deleteUser(@PathVariable("userId") String email){
    try{
      userService.deleteUser(email);
      return ResponseEntity.ok("User deleted successfully");
    }catch (UsernameNotFoundException e){
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
    }
  }

  @PostMapping("/{userId}/image")
  public ResponseEntity<String> uploadUserImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
  try {
    userService.updateUserImage(id, file);
    return ResponseEntity.ok("Image uploaded successfully");

  } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
    }
  }

  @GetMapping(value = "/{userId}/image", produces = MediaType.IMAGE_JPEG_VALUE)
  public ResponseEntity<byte[]> getUserImage(@PathVariable Long userId) {
    byte[] image = userService.getUserImage(userId);
    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
  }
}