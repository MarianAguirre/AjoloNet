package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.Auth.AuthResponse;
import com.ajoloNET.ProyectFinal.Auth.AuthService;
import com.ajoloNET.ProyectFinal.DTOs.UpdateUserRequest;
import com.ajoloNET.ProyectFinal.User.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(HttpServletRequest request) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = authService.getUserByUsername(username);
        log.info("GET: me {}", username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AuthResponse> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        log.info("se esta actualizando {}, {}", id, request);
        return ResponseEntity.ok(authService.updateUser(id, request));

    }
}
