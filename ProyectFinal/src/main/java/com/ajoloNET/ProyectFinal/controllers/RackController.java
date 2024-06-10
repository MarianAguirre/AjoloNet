package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Rack;
import com.ajoloNET.ProyectFinal.services.RackService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/rack")
@Slf4j
public class RackController {

    private final RackService rackService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        return ResponseEntity.ok(rackService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Rack> get(@PathVariable String name){
        log.info("GET: Rack {}", name);
        return ResponseEntity.ok(this.rackService.readByName(name));
    }

    @PostMapping
    public ResponseEntity<Rack> post(@RequestBody Rack rack){
        log.info("POST: Rack {}", rack.getName());
        return ResponseEntity.created(
                URI.create(this.rackService.create(rack).getName()))
                .build();
    }

    @PutMapping("/{name}")
    public ResponseEntity<Rack> put(@RequestBody Rack rack,
                                    @PathVariable String name){
        log.info("PUT: Rack {}", name);
        return ResponseEntity.ok(this.rackService.update(rack, name));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Rack {}", name);
        this.rackService.delete(name);
        return ResponseEntity.noContent().build();
    }



}
