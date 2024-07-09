package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.DTOs.PortConectionDTO;
import com.ajoloNET.ProyectFinal.entities.PortConnection;
import com.ajoloNET.ProyectFinal.services.PortConnectionService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/port_connections")
@Slf4j
public class PortConnectionController {

    @Autowired
    private PortConnectionService portConnectionService;

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
    public PortConnection createConnection(@RequestBody PortConectionDTO request) {
        return portConnectionService.createConnection(request);
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
