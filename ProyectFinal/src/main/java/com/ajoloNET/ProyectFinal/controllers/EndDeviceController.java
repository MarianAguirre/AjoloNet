package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.services.EndDeviceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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
        log.info("GET ALL End Devices");
        return ResponseEntity.ok(endDeviceService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<EndDevice> get(@PathVariable String name){
        log.info("GET: End Device {}", name);
        return ResponseEntity.ok(this.endDeviceService.readByName(name));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<EndDevice>> getId(@PathVariable Long id){
        log.info("GET_ID: End Device {}",id);
        return ResponseEntity.ok(this.endDeviceService.findById(id));
    }


    @PostMapping
    public ResponseEntity<EndDevice> post(@RequestBody EndDevice endDevice){
        log.info("POST: End Device {}", endDevice.getName());
        EndDevice savedEndDevice = this.endDeviceService.create(endDevice);

        // Crear la URI con UriComponentsBuilder
        URI location = UriComponentsBuilder.fromPath("/endDevice/{id}")
                .buildAndExpand(savedEndDevice.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @PutMapping("/id/{id}")
    public ResponseEntity<EndDevice> putId(@RequestBody EndDevice endDevice,
                                         @PathVariable Long id){
        log.info("PUT_ID: End Device {}", id);
        return ResponseEntity.ok(this.endDeviceService.updateById(endDevice, id));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: End Device {}", name);
        this.endDeviceService.delete(name);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: End Device {}", id);
        this.endDeviceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
