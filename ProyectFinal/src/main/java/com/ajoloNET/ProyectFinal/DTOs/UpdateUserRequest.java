package com.ajoloNET.ProyectFinal.DTOs;

import com.ajoloNET.ProyectFinal.User.Role;
import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private Role role;
}
