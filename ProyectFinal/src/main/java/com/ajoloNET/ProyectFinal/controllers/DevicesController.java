package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.DTOs.DevicesDTO;
import com.ajoloNET.ProyectFinal.services.DeviceServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/Devices")
@Slf4j
public class DevicesController {

    private final DeviceServiceImpl deviceService;

    @GetMapping
    public ResponseEntity<DevicesDTO> getAllDevices(){
        log.info("GET ALL DEVICES");
        DevicesDTO devices = deviceService.getAllDevices();
        return ResponseEntity.ok(devices);
    }
}
