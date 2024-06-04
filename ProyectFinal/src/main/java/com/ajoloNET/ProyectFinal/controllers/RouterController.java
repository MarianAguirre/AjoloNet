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
@RequestMapping(path = "router")
@Slf4j
public class RouterController {

    private final RouterService routerService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        return ResponseEntity.ok(routerService.getEverything());
    }

    @GetMapping(path = "{name}")
    public ResponseEntity<Router>get(@PathVariable String name){
        log.info("GET: Router {}",name);
        return  ResponseEntity.ok(this.routerService.readByName(name));

    }

    @GetMapping(path = "{id}")
    public ResponseEntity<Optional<Router>> getId(@PathVariable Long id){
        log.info("GET_id: Router{}",id);
        return ResponseEntity.ok(this.routerService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Router> post(@RequestBody Router router){
        log.info("POST: Router {}", router.getName());
        return ResponseEntity.created(
                URI.create(this.routerService.create(router).getName()))
                .build();
    }

    @PutMapping(path = "{name}")
    public ResponseEntity<Router> put(@RequestBody Router router,
                                      @PathVariable String name){
        log.info("PUT: Router {}", name);
        return ResponseEntity.ok(this.routerService.update(router, name));

    }

    @DeleteMapping(path = "{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Router {}", name);
        this.routerService.delete(name);
        return ResponseEntity.noContent().build();

    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        log.info("DELETE id: Router{}", id);
        this.routerService.deleteById(id);
        return ResponseEntity.noContent().build();

    }
}
