package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.DTOs.PortConectionDTO;
import com.ajoloNET.ProyectFinal.DTOs.PortConnectionRequest;
import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.PortConnection;
import com.ajoloNET.ProyectFinal.services.PortConnectionServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/port-connections")
@Slf4j
public class PortConnectionController {

    @Autowired
    private PortConnectionServiceImpl portConnectionService;

    @GetMapping
    public ResponseEntity<List<PortConnection>> getAllConnections(){
        List<PortConnection> connections = portConnectionService.getAllConnections();
        return ResponseEntity.ok(connections);
    }

    @PostMapping
    public ResponseEntity<PortConnection> createConnection(@RequestBody PortConnectionRequest request) {
        log.info("POST connection: {} {} {} -- {} {} {} ", request.getSourceType(), request.getDestinationId(),request.getDestinationPort() , request.getSourceType(), request.getSourceId(), request.getSourcePort());
        PortConnection connection = portConnectionService.createConnection(
                request.getSourceType(),
                request.getSourceId(),
                request.getSourcePort(),
                request.getDestinationType(),
                request.getDestinationId(),
                request.getDestinationPort()
        );

        return ResponseEntity.ok(connection);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortConnection> getConnection(@PathVariable Long id) {
        return portConnectionService.getConnection(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConnection(@PathVariable Long id) {
        portConnectionService.deleteConnection(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ports")
    public ResponseEntity<List<Port>> getPortsByDevice(@RequestParam DeviceType deviceType, @RequestParam Long deviceId) {
        List<Port> ports = portConnectionService.getPortsByDevice(deviceType, deviceId);
        return ResponseEntity.ok(ports);
    }

}
