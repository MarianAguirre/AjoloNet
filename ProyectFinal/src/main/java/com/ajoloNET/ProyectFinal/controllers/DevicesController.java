package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.DTOs.DevicesDTO;
import com.ajoloNET.ProyectFinal.services.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/Devices")
@Slf4j
public class DevicesController {

    private final DeviceServiceImpl deviceService;

    private final RouterService routerService;
    private final SwitchService switchService;
    private final PatchPanelService patchPanelService;
    private final EndDeviceService endDeviceService;

    @GetMapping
    public ResponseEntity<DevicesDTO> getAllDevices(){
        log.info("GET ALL DEVICES");
        DevicesDTO devices = deviceService.getAllDevices();
        return ResponseEntity.ok(devices);
    }

    @DeleteMapping("/{deviceType}/{id}")
    public ResponseEntity<Void> deleteDeviceById(@PathVariable String deviceType, @PathVariable Long id) {
        log.info("DELETE Device [{}]: {}", deviceType, id);

        switch (deviceType.toLowerCase()) {
            case "router":
                routerService.deleteById(id);
                break;
            case "switch":
                switchService.deleteById(id);
                break;
            case "patchPanel":
                patchPanelService.deleteById(id);
                break;
            case "endDevice":
                endDeviceService.deleteById(id);
                break;
            // Agregar casos para otros tipos de dispositivos según sea necesario
            default:
                return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.noContent().build();
    }
}
