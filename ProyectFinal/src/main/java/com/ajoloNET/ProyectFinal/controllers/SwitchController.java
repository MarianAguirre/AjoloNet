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
@RequestMapping("/switch")
@Slf4j
public class SwitchController {

    private final SwitchService switchService;

    @GetMapping
        public ResponseEntity<?> getEverything(){
        return ResponseEntity.ok(switchService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Switch>get(@PathVariable String name){
        log.info("GET: Switch {}", name);
        return ResponseEntity.ok(this.switchService.readByName(name));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Switch>> getId(@PathVariable Long id){
        log.info("GET_ID: Switch {}", id);
        return ResponseEntity.ok(this.switchService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Switch> post(@RequestBody Switch aSwitch){
        log.info("POST: Switch   {}", aSwitch.getName());
        return ResponseEntity.created(
                URI.create(this.switchService.create(aSwitch).getName()))
                .build();
    }

    @PutMapping("/{name}")
    public ResponseEntity<Switch> put(@RequestBody Switch aSwitch,
                                      @PathVariable String name){
        log.info("PUT: Switch {}", name);
        return ResponseEntity.ok(this.switchService.update(aSwitch, name));
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<Switch> putId(@RequestBody Switch aSwitch,
                                      @PathVariable Long id){
        log.info("PUT_ID: Switch {}", id);
        return ResponseEntity.ok(this.switchService.updateById(aSwitch, id));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Switch {}", name);
        this.switchService.delete(name);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: Switch {}",id);
        this.switchService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
