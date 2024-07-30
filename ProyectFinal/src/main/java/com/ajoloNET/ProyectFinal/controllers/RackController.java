package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Rack;
import com.ajoloNET.ProyectFinal.entities.Switch;
import com.ajoloNET.ProyectFinal.services.RackService;
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
@RequestMapping("api/rack")
@Slf4j
@Tag(name = "Rack resource")
public class RackController {

    private final RackService rackService;
    @Operation(summary = "Get all Rack in a general get")
    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL Racks");
        return ResponseEntity.ok(rackService.getEverything());
    }
    @Operation(summary = "Get a Racks given a Rack id")
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Rack>> getId(@PathVariable Long id){
        log.info("GET_ID: Rack {}", id);
        return ResponseEntity.ok(this.rackService.findById(id));
    }
    @Operation(summary = "Save in DB a Racks given a Rack body")
    @PostMapping
    public ResponseEntity<Rack> post(@RequestBody Rack rack){
        log.info("POST: Rack {}", rack.getName());
        Rack saveRack = this.rackService.create(rack);

        // Crear la URI con UriComponentsBuilder
        URI location = UriComponentsBuilder.fromPath("/switch/{id}")
                .buildAndExpand(saveRack.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @Operation(summary = "Update in DB a Racks given a Rack id")
    @PutMapping("/id/{id}")
    public ResponseEntity<Rack> putId(@RequestBody Rack rack,
                                    @PathVariable Long id){
        log.info("PUT_ID: Rack {}", id);
        return ResponseEntity.ok(this.rackService.updateById(rack,id));
    }
    @Operation(summary = "Delete in DB a Racks given a Rack id")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: Rack {}",id);
        this.rackService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
