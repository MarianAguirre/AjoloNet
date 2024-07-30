package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.Area;
import com.ajoloNET.ProyectFinal.services.AreaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/area")
@Slf4j
@Tag(name = "Areas resource")
public class AreaController {

    private final AreaService areaService;

    @Operation(summary = "Get all areas in a general get")
    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL Areas");
        return ResponseEntity.ok(areaService.getEverything());
    }
    @Operation(summary = "Get a Areas given a Area id")
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Area>> getID(@PathVariable Long id){
        log.info("GET_ID: Area {}", id);
        return ResponseEntity.ok(this.areaService.findById(id));
    }
    @Operation(summary = "Save in DB a Areas given a Area from body")
    @PostMapping
    public ResponseEntity<Area> post(@RequestBody Area area){
        log.info("POST: Area {}", area.getName());
        Area createdArea = this.areaService.crate(area);

        // Codificar el nombre del área para la URI
        String encodedName = URLEncoder.encode(createdArea.getName(), StandardCharsets.UTF_8);

        return ResponseEntity.created(
                        URI.create("/areas/" + encodedName))
                .body(createdArea);
    }
    @Operation(summary = "Update in DB a Areas given a Area id")
    @PutMapping("/id/{id}")
    public ResponseEntity<Area> putId(@RequestBody Area area,
                                    @PathVariable Long id){
        log.info("PUT_ID: Area {}", id);
        return ResponseEntity.ok(this.areaService.updateById(area, id));
    }
    @Operation(summary = "Delete in DB a Areas given a Area id")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteId(@PathVariable Long id){
        log.info("DELETE_ID: Area {}", id);
        this.areaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}