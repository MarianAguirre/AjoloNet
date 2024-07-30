package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.services.RouterService;
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
@RequestMapping("api/router")
@Slf4j
@Tag(name = "Router Resource")
public class RouterController {

    private final RouterService routerService;

    @Operation(summary = "Get all Routers in a general get")
    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL Routers");
        return ResponseEntity.ok(routerService.getEverything());
    }
    @Operation(summary = "Get a Routers given a Router id")
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Router>> getId(@PathVariable Long id){
        log.info("GET_ID: Router {}",id);
        return ResponseEntity.ok(this.routerService.findById(id));
    }
    @Operation(summary = "Save in DB a Routers given a Router body")
    @PostMapping
    public ResponseEntity<Router> post(@RequestBody Router router){
        log.info("POST: Router {}", router);
        Router savedRouter = this.routerService.create(router);

        // Crear la URI con UriComponentsBuilder
        URI location = UriComponentsBuilder.fromPath("/router/{id}")
                .buildAndExpand(savedRouter.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @Operation(summary = "Update in DB a Routers given a Router id")
    @PutMapping("/id/{id}")
    public ResponseEntity<Router> putId(@RequestBody Router router,
                                      @PathVariable Long id){
        log.info("PUT_ID: Router {}", id);
        return ResponseEntity.ok(this.routerService.updateById(router, id));

    }
    @Operation(summary = "Delete in DB a Routers given a Router id")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        log.info("DELETE_ID: Router {}", id);
        this.routerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
