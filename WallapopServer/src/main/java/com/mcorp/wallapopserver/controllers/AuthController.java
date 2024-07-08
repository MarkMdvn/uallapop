package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.exceptions.UserAlreadyExistsException;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.requests.LoginRequest;
import com.mcorp.wallapopserver.responses.JwtResponse;
import com.mcorp.wallapopserver.security.jwt.JwtTokenUtil;
import com.mcorp.wallapopserver.security.user.WallapopUserDetails;
import com.mcorp.wallapopserver.services.UserService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenUtil jwtUtils;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User user) {
    try {
      userService.registerUser(user);
      return ResponseEntity.ok("Registration successful!");

    } catch (UserAlreadyExistsException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
    Authentication authentication =
        authenticationManager
            .authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtTokenForUser(authentication);
    WallapopUserDetails userDetails = (WallapopUserDetails) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities()
        .stream()
        .map(GrantedAuthority::getAuthority).toList();
    return ResponseEntity.ok(new JwtResponse(
        userDetails.getId(),
        userDetails.getEmail(),
        jwt,
        roles));
  }
}