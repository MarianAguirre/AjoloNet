package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Area;
import com.ajoloNET.ProyectFinal.services.AreaService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/area")
@Slf4j
public class AreaController {

    private final AreaService areaService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL Areas");
        return ResponseEntity.ok(areaService.getEverything());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Area> get(@PathVariable String name){
        log.info("GET: Area {}", name);
        return ResponseEntity.ok(this.areaService.readByName(name));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Area>> getID(@PathVariable Long id){
        log.info("GET_ID: Area {}", id);
        return ResponseEntity.ok(this.areaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Area> post(@RequestBody Area area){
        log.info("POST: Area {}", area.getName());
        return ResponseEntity.created(
                URI.create(this.areaService.crate(area).getName()))
                .build();
    }

    @PutMapping("/{name}")
    public ResponseEntity<Area> put(@RequestBody Area area,
                                    @PathVariable String name){
        log.info("PUT: Area {}", name);
        return ResponseEntity.ok(this.areaService.update(area, name));
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<Area> putId(@RequestBody Area area,
                                    @PathVariable Long id){
        log.info("PUT_ID: Area {}", id);
        return ResponseEntity.ok(this.areaService.updateById(area, id));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        log.info("DELETE: Area {}", name);
        this.areaService.delete(name);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: Area {}", id);
        this.areaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
