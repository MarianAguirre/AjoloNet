package com.ajoloNET.ProyectFinal.Auth;

import com.ajoloNET.ProyectFinal.DTOs.UpdateUserRequest;
import com.ajoloNET.ProyectFinal.Jwt.JwtService;
import com.ajoloNET.ProyectFinal.User.Role;
import com.ajoloNET.ProyectFinal.User.User;
import com.ajoloNET.ProyectFinal.User.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .role(Role.USER).build();

        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public AuthResponse updateUser(Long userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
        user.setUsername(request.getUsername());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
            }
        }


        userRepository.save(user);
        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public AuthResponse updateUsers(Long userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
        user.setUsername(request.getUsername());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
            }
        }

        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }

        userRepository.save(user);
        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
        userRepository.delete(user);
    }

}
