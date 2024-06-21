package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.services.RouterService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/router")
@Slf4j
public class RouterController {

    private final RouterService routerService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL Routers");
        return ResponseEntity.ok(routerService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Router>get(@PathVariable String name){
        log.info("GET: Router {}",name);
        return  ResponseEntity.ok(this.routerService.readByName(name));

    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Router>> getId(@PathVariable Long id){
        log.info("GET_ID: Router {}",id);
        return ResponseEntity.ok(this.routerService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Router> post(@RequestBody Router router){
        log.info("POST: Router {}", router.getName());
        Router savedRouter = this.routerService.create(router);

        // Crear la URI con UriComponentsBuilder
        URI location = UriComponentsBuilder.fromPath("/router/{id}")
                .buildAndExpand(savedRouter.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{name}")
    public ResponseEntity<Router> put(@RequestBody Router router,
                                      @PathVariable String name){
        log.info("PUT: Router {}", name);
        return ResponseEntity.ok(this.routerService.update(router, name));

    }

    @PutMapping("/id/{id}")
    public ResponseEntity<Router> putId(@RequestBody Router router,
                                      @PathVariable Long id){
        log.info("PUT_ID: Router {}", id);
        return ResponseEntity.ok(this.routerService.updateById(router, id));

    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Router {}", name);
        this.routerService.delete(name);
        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        log.info("DELETE_ID: Router {}", id);
        this.routerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
