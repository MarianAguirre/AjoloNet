package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.services.EndDeviceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/endDevice")
@Slf4j
public class EndDeviceController {

    private final EndDeviceService endDeviceService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        return ResponseEntity.ok(endDeviceService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<EndDevice> get(@PathVariable String name){
        log.info("GET: End Device {}", name);
        return ResponseEntity.ok(this.endDeviceService.readByName(name));
    }


    @PostMapping
    public ResponseEntity<EndDevice> post(@RequestBody EndDevice endDevice){
        log.info("POST: End Device {}", endDevice.getName());
        return ResponseEntity.created(
                URI.create(this.endDeviceService.create(endDevice).getName()))
                .build();
    }

    @PutMapping("/{name}")
    public ResponseEntity<EndDevice> put(@RequestBody EndDevice endDevice,
                                         @PathVariable String name){
        log.info("PUT: End Device {}", name);
        return ResponseEntity.ok(this.endDeviceService.update(endDevice, name));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: End Device {}", name);
        this.endDeviceService.delete(name);
        return ResponseEntity.noContent().build();
    }


}
