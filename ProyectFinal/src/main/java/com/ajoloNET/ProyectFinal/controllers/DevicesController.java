package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.DTOs.DevicesDTO;
import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.entities.PatchPanel;
import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.entities.Switch;
import com.ajoloNET.ProyectFinal.services.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@AllArgsConstructor
@RequestMapping("api/Devices")
@Slf4j
@Tag(name = "General Devices Controller")
public class DevicesController {

    private final DeviceServiceImpl deviceService;

    private final RouterService routerService;
    private final SwitchService switchService;
    private final PatchPanelService patchPanelService;
    private final EndDeviceService endDeviceService;
    @Operation(summary = "Get all devices in the DB")
    @GetMapping
    public ResponseEntity<DevicesDTO> getAllDevices(){
        log.info("GET ALL DEVICES");
        DevicesDTO devices = deviceService.getAllDevices();
        return ResponseEntity.ok(devices);
    }
    @Operation(summary = "Get specific devices by device name and id")
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
            case "patch_panel":
                patchPanelService.deleteById(deviceId);
                break;
            case "end_device":
                endDeviceService.deleteById(deviceId);
                break;
            default:
                return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.noContent().build();
    }
    @Operation(summary = "Update in DB specific devices by device name and id")
    @PutMapping("/{deviceType}/{deviceId}")
    public ResponseEntity<?> updateDevice(@PathVariable String deviceType, @PathVariable Long deviceId, @RequestBody Map<String, Object> device) {
        log.info("PUT Device [{}]: {} {}", deviceType, deviceId, device);

        try {
            switch (deviceType.toLowerCase()) {
                case "router":
                    Router router = convertToRouter(device);
                    Router updatedRouter = routerService.updateById(router, deviceId);
                    return ResponseEntity.ok(updatedRouter);
                case "switch":
                    Switch switchDevice = convertToSwitch(device);
                    Switch updatedSwitch = switchService.updateById(switchDevice, deviceId);
                    return ResponseEntity.ok(updatedSwitch);
                case "patch_panel":
                    PatchPanel patchPanel = convertToPatchPanel(device);
                    PatchPanel updatedPatchPanel = patchPanelService.update(patchPanel, deviceId);
                    return ResponseEntity.ok(updatedPatchPanel);
                case "end_device":
                    EndDevice endDevice = convertToEndDevice(device);
                    EndDevice updatedEndDevice = endDeviceService.updateById(endDevice, deviceId);
                    return ResponseEntity.ok(updatedEndDevice);
                default:
                    return ResponseEntity.badRequest().build();
            }
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Métodos para convertir el objeto genérico (LinkedHashMap) al tipo específico

    private Router convertToRouter(Map<String, Object> device) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(device, Router.class);
    }

    private Switch convertToSwitch(Map<String, Object> device) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(device, Switch.class);
    }

    private PatchPanel convertToPatchPanel(Map<String, Object> device) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(device, PatchPanel.class);
    }

    private EndDevice convertToEndDevice(Map<String, Object> device) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(device, EndDevice.class);
    }
}

