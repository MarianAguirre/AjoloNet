package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.DTOs.PortConnectionRequest;
import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.PortConnection;
import com.ajoloNET.ProyectFinal.services.PortConnectionServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/port-connections")
@Slf4j
@Tag(name = "Physical Connection Resource")
public class PortConnectionController {

    private final PortConnectionServiceImpl portConnectionService;
    @Operation(summary = "Get all Connection of a device given a Device Type and id")
    @GetMapping("/device")
    public ResponseEntity<List<PortConnection>> getConnectionsByDevice(
            @RequestParam("deviceType") DeviceType deviceType,
            @RequestParam("deviceId") Long deviceId) {
        List<PortConnection> connections = portConnectionService.getConnectionsByDevice(deviceType, deviceId);
        return ResponseEntity.ok(connections);
    }
    @Operation(summary = "Get all Connection in a general get")
    @GetMapping
    public ResponseEntity<List<PortConnection>> getAllConnections(){
        List<PortConnection> connections = portConnectionService.getAllConnections();
        return ResponseEntity.ok(connections);
    }
    @Operation(summary = "Save in DB a physical connection between devices given a device type and identification of both devices to connect ")
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
    @Operation(summary = "Get a Connection given a Connection id")
    @GetMapping("/{id}")
    public ResponseEntity<PortConnection> getConnection(@PathVariable Long id) {
        return portConnectionService.getConnection(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @Operation(summary = "Delete in DB a Connection given a Connection id ")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConnection(@PathVariable Long id) {
        portConnectionService.deleteConnection(id);
        return ResponseEntity.noContent().build();
    }
    @Operation(summary = "Get a Physical Ports of a Device given a the Device Type and device id")
    @GetMapping("/ports")
    public ResponseEntity<List<Port>> getPortsByDevice(@RequestParam DeviceType deviceType, @RequestParam Long deviceId) {
        List<Port> ports = portConnectionService.getPortsByDevice(deviceType, deviceId);
        return ResponseEntity.ok(ports);
    }

}
