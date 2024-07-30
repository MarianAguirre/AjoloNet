package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.services.EndDeviceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/endDevice")
@Slf4j
@Tag(name = "End Devices resource")
public class EndDeviceController {

    private final EndDeviceService endDeviceService;
    @Operation(summary = "Get all End Devices in a general get")
    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL End Devices");
        return ResponseEntity.ok(endDeviceService.getEverything());
    }
    @Operation(summary = "Get a End Devices given a End Device id")
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<EndDevice>> getId(@PathVariable Long id){
        log.info("GET_ID: End Device {}",id);
        return ResponseEntity.ok(this.endDeviceService.findById(id));
    }
    @Operation(summary = "Save in DB a End Devices given a End Device body")
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
    @Operation(summary = "Update in DB a End Devices given a End Device id")
    @PutMapping("/id/{id}")
    public ResponseEntity<EndDevice> putId(@RequestBody EndDevice endDevice,
                                         @PathVariable Long id){
        log.info("PUT_ID: End Device {}", id);
        return ResponseEntity.ok(this.endDeviceService.updateById(endDevice, id));
    }
    @Operation(summary = "Delete in DB a End Devices given a End Device id")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: End Device {}", id);
        this.endDeviceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
