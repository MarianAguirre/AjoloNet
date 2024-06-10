package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.services.RouterService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/router")
@Slf4j
public class RouterController {

    private final RouterService routerService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        return ResponseEntity.ok(routerService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Router>get(@PathVariable String name){
        log.info("GET: Router {}",name);
        return  ResponseEntity.ok(this.routerService.readByName(name));

    }

    @PostMapping
    public ResponseEntity<Router> post(@RequestBody Router router){
        log.info("POST: Router {}", router.getName());
        return ResponseEntity.created(
                URI.create(this.routerService.create(router).getName()))
                .build();
    }

    @PutMapping("/{name}")
    public ResponseEntity<Router> put(@RequestBody Router router,
                                      @PathVariable String name){
        log.info("PUT: Router {}", name);
        return ResponseEntity.ok(this.routerService.update(router, name));

    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Router {}", name);
        this.routerService.delete(name);
        return ResponseEntity.noContent().build();

    }


}
