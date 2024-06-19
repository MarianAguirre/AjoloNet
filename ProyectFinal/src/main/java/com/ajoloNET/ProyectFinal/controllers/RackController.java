package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Rack;
import com.ajoloNET.ProyectFinal.entities.Switch;
import com.ajoloNET.ProyectFinal.services.RackService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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
        log.info("GET ALL Racks");
        return ResponseEntity.ok(rackService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Rack> get(@PathVariable String name){
        log.info("GET: Rack {}", name);
        return ResponseEntity.ok(this.rackService.readByName(name));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Rack>> getId(@PathVariable Long id){
        log.info("GET_ID: Rack {}", id);
        return ResponseEntity.ok(this.rackService.findById(id));
    }

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

    @PutMapping("/{name}")
    public ResponseEntity<Rack> put(@RequestBody Rack rack,
                                    @PathVariable String name){
        log.info("PUT: Rack {}", name);
        return ResponseEntity.ok(this.rackService.update(rack, name));
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<Rack> putId(@RequestBody Rack rack,
                                    @PathVariable Long id){
        log.info("PUT_ID: Rack {}", id);
        return ResponseEntity.ok(this.rackService.updateById(rack,id));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Rack {}", name);
        this.rackService.delete(name);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: Rack {}",id);
        this.rackService.deleteById(id);
        return ResponseEntity.noContent().build();
    }



}
