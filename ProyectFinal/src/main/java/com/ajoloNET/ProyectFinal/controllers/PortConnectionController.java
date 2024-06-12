package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.PortConnection;
import com.ajoloNET.ProyectFinal.services.PortConnectionService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/port_connections")
@Slf4j
public class PortConnectionController {

    private final PortConnectionService portConnectionService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL Connections");
        return ResponseEntity.ok(portConnectionService.getAllConnections());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<PortConnection>> getId(@PathVariable Long id){
        log.info("GET_id: Port Connection {}", id);
        return ResponseEntity.ok(this.portConnectionService.getConnectionById(id));
    }

    @PostMapping
    public PortConnection createConnection(@RequestParam Long sourcePortId, @RequestParam Long destinationPortId) {
        log.info("POST: connection create");
        return portConnectionService.createConnection(sourcePortId, destinationPortId);
    }

    @PutMapping("/{id}")
    public PortConnection updateConnection(@PathVariable Long id, @RequestBody PortConnection connectionDetails) {
        log.info("PUT: Connection update");
        return portConnectionService.update(connectionDetails, id);
    }

    @DeleteMapping("/{id}")
    public void deleteConnection(@PathVariable Long id) {
        portConnectionService.deleteConnection(id);
    }
}
