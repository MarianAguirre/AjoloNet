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

    @DeleteMapping("/{deviceType}/{deviceId}")
    public ResponseEntity<Void> deleteDeviceById(@PathVariable String deviceType, @PathVariable Long deviceId) {
        log.info("DELETE Device [{}]: {}", deviceType, deviceId);

        switch (deviceType.toLowerCase()) {
            case "router":
                routerService.deleteById(deviceId);
                break;
            case "switch":
                switchService.deleteById(deviceId);
                break;
            case "patch-panel":
                patchPanelService.deleteById(deviceId);
                break;
            case "end-device":
                endDeviceService.deleteById(deviceId);
                break;
            default:
                return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.noContent().build();
    }


}
