package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Switch;
import com.ajoloNET.ProyectFinal.services.SwitchService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(path = "switch")
@Slf4j
public class SwitchController {

    private final SwitchService switchService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        return ResponseEntity.ok(switchService.getEverything());
    }

    @GetMapping(path = "{name}")
    public ResponseEntity<Switch>get(@PathVariable String name){
        log.info("GET: Switch {}", name);
        return ResponseEntity.ok(this.switchService.readByName(name));
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<Optional<Switch>> getId(@PathVariable Long id){
        log.info("GET id: Switch{}", id);
        return ResponseEntity.ok(this.switchService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Switch> post(@RequestBody Switch aSwitch){
        log.info("POST: Router {}", aSwitch.getName());
        return ResponseEntity.created(
                URI.create(this.switchService.create(aSwitch).getName()))
                .build();
    }

    @PutMapping(path = "{name}")
    public ResponseEntity<Switch> put(@RequestBody Switch aSwitch,
                                      @PathVariable String name){
        log.info("PUT: Switch {}", name);
        return ResponseEntity.ok(this.switchService.update(aSwitch, name));
    }

    @DeleteMapping(path = "{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Switch {}", name);
        this.switchService.delete(name);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        log.info("DELETE id: Switch{}", id);
        this.switchService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
