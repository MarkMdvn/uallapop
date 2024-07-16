package com.mcorp.wallapopserver.services;

import com.mcorp.wallapopserver.DTO.UserDTO;
import com.mcorp.wallapopserver.exceptions.UserAlreadyExistsException;
import com.mcorp.wallapopserver.models.Role;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.repositories.RoleRepository;
import com.mcorp.wallapopserver.repositories.UserRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final RoleRepository roleRepository;


  public User registerUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new UserAlreadyExistsException(user.getEmail() + " already exists");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    System.out.println(user.getPassword());
    Role userRole = roleRepository.findByName("ROLE_USER").get();
    user.setRoles(Collections.singletonList(userRole));
    return userRepository.save(user);
  }

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public Optional<User> findUserById(Long id) {
    return userRepository.findById(id);
  }


  public Long getUserIdFromPrincipal(Principal principal) {
    String email = principal.getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    return user.getId();
  }

  public List<User> getUsers() {
    return userRepository.findAll();
  }

  @Transactional
  public void deleteUser(String email) {
    User theUser = getUser(email);
    if (theUser != null) {
      userRepository.deleteByEmail(email);
    }

  }

  @Transactional
  public void updateUserImage(Long userId, MultipartFile imageFile) {
    try {
      User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
      byte[] imageData = imageFile.getBytes();
      user.setProfileImage(imageData);
      userRepository.save(user);
    } catch (IOException e) {
      throw new RuntimeException("Error processing image file", e);
    }
  }


  public User getUser(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }

  public User saveUserWithImage(Long userId, MultipartFile image) throws IOException {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    user.setProfileImage(image.getBytes());
    return userRepository.save(user);
  }

  public byte[] getUserImage(Long userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    return user.getProfileImage();


  }

  public UserDTO getUserById(Long userId) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) return null;

    UserDTO dto = new UserDTO();
    dto.setId(user.getId());
    dto.setName(user.getName());
    dto.setProfileImg(user.getProfileImage());
    dto.setEmail(user.getEmail());
    dto.setLocation(user.getLocation());
    dto.setAverageRating(user.getAverageRating());
    dto.setTotalSales(user.getTotalSales());
    dto.setTotalPurchases(user.getTotalPurchases());
    dto.setTotalItemsShipped(user.getTotalItemsShipped());
    dto.setProductIds(user.getProducts().stream().map(product -> product.getId()).collect(
        Collectors.toList()));

    return dto;
  }

}