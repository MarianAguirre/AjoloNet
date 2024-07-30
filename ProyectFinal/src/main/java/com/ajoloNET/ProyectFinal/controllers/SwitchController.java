package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Switch;
import com.ajoloNET.ProyectFinal.services.SwitchService;
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
@RequestMapping("api/switch")
@Slf4j
@Tag(name = "Switch Resource")
public class SwitchController {

    private final SwitchService switchService;

    @Operation(summary = "Get all Switches in a general get")
    @GetMapping
        public ResponseEntity<?> getEverything(){
        log.info("GET ALL Switches");
        return ResponseEntity.ok(switchService.getEverything());
    }
    @Operation(summary = "Get a Switches given a Switch id")
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Switch>> getId(@PathVariable Long id){
        log.info("GET_ID: Switch {}", id);
        return ResponseEntity.ok(this.switchService.findById(id));
    }
    @Operation(summary = "Save in DB a Switches given a Switch body")
    @PostMapping
    public ResponseEntity<Switch> post(@RequestBody Switch aSwitch){
        log.info("POST: Switch  {} {}",aSwitch.getName(), aSwitch.getIpAddress());
        Switch savedSwitch = this.switchService.create(aSwitch);

        // Crear la URI con UriComponentsBuilder
        URI location = UriComponentsBuilder.fromPath("/switch/{id}")
                .buildAndExpand(savedSwitch.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @Operation(summary = "Update in DB a Switches given a Switch id")
    @PutMapping("/id/{id}")
    public ResponseEntity<Switch> putId(@RequestBody Switch aSwitch,
                                      @PathVariable Long id){
        log.info("PUT_ID: Switch {}", id);
        return ResponseEntity.ok(this.switchService.updateById(aSwitch, id));
    }
    @Operation(summary = "Delete in DB a Switches given a Switch id")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: Switch {}",id);
        this.switchService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
