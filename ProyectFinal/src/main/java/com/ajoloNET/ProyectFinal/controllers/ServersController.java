package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Servers;
import com.ajoloNET.ProyectFinal.services.ServersService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@AllArgsConstructor
@RequestMapping("api/servers")
@Slf4j
@Tag(name = "Servers Resource")
public class ServersController {

    private final ServersService serversService;

    // Obtener todos los servidores con sus relaciones
    @GetMapping
    public ResponseEntity<List<Servers>> getAllServers() {
        List<Servers> servers = serversService.getEverything();
        return new ResponseEntity<>(servers, HttpStatus.OK);
    }

    // Obtener un servidor específico por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Servers> getServerById(@PathVariable Long id) {
        Servers server = serversService.findById(id);
        return new ResponseEntity<>(server, HttpStatus.OK);
    }

    // Crear un nuevo servidor
    @PostMapping("/create")
    public ResponseEntity<Servers> createServer(@RequestBody Servers server) {
        Servers newServer = serversService.create(server);
        return new ResponseEntity<>(newServer, HttpStatus.CREATED);
    }

    // Actualizar un servidor por su ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Servers> updateServer(@PathVariable Long id, @RequestBody Servers server) {
        Servers updatedServer = serversService.updateById(server, id);
        return new ResponseEntity<>(updatedServer, HttpStatus.OK);
    }

    // Eliminar un servidor por su ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteServer(@PathVariable Long id) {
        serversService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
