package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Cisco2900Config;
import com.ajoloNET.ProyectFinal.services.CiscoTestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/Test")
@AllArgsConstructor
public class CiscoTestController {

    private final CiscoTestService ciscoConfigService;

    // Endpoint para guardar la configuración
    @PostMapping("/save")
    public ResponseEntity<Cisco2900Config> saveConfig(@RequestBody Cisco2900Config ciscoConfig) {
        Cisco2900Config savedConfig = ciscoConfigService.saveConfig(ciscoConfig);
        return ResponseEntity.ok(savedConfig);
    }

    // Endpoint para consultar todas las configuraciones
    @GetMapping("/all")
    public ResponseEntity<List<Cisco2900Config>> getAllConfigs() {
        List<Cisco2900Config> configs = ciscoConfigService.getAllConfigs();
        return ResponseEntity.ok(configs);
    }

    // Endpoint para consultar una configuración por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cisco2900Config> getConfigById(@PathVariable Long id) {
        return ciscoConfigService.getConfigById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
