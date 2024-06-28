package com.ajoloNET.ProyectFinal.ADMIN;


import com.ajoloNET.ProyectFinal.Auth.AuthResponse;
import com.ajoloNET.ProyectFinal.Auth.AuthService;
import com.ajoloNET.ProyectFinal.DTOs.UpdateUserRequest;
import com.ajoloNET.ProyectFinal.User.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuthService authService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(authService.listUsers());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AuthResponse> updateUsers(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(authService.updateUsers(id, request));
    }
}

