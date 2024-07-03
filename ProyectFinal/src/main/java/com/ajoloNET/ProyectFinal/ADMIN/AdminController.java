package com.ajoloNET.ProyectFinal.ADMIN;


import com.ajoloNET.ProyectFinal.Auth.AuthResponse;
import com.ajoloNET.ProyectFinal.Auth.AuthService;
import com.ajoloNET.ProyectFinal.DTOs.UpdateUserRequest;
import com.ajoloNET.ProyectFinal.User.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AuthService authService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        log.info("Get all users");
        return ResponseEntity.ok(authService.listUsers());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AuthResponse> updateUsers(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        log.info("Actualizando usuario {} con esta info: {}",id, request);
        return ResponseEntity.ok(authService.updateUsers(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteById(@PathVariable Long id){
        log.info("Delete User {}", id);
        this.authService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

