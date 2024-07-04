package com.mcorp.wallapopserver.controllers;

import com.mcorp.wallapopserver.exceptions.UserAlreadyExistsException;
import com.mcorp.wallapopserver.models.User;
import com.mcorp.wallapopserver.services.UserService;
import java.awt.image.RescaleOp;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final UserService userService;

  @PostMapping("/register-user")
  public ResponseEntity<?> registerUser (User user) {
    try {
      userService.registerUser(user);
      return ResponseEntity.ok("Registration successful");
    } catch(UserAlreadyExistsException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

    }
  }

}
