package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.MaintenanceRecord;
import com.ajoloNET.ProyectFinal.services.MaintenanceRecordService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance-records")
@Slf4j
@AllArgsConstructor
public class MaintenanceRecordController {

    private final MaintenanceRecordService maintenanceRecordService;

    @GetMapping
    public ResponseEntity<List<MaintenanceRecord>> getAll(){
        List<MaintenanceRecord> Maintenance = maintenanceRecordService.getAll();
        return ResponseEntity.ok(Maintenance);
    }

    @PostMapping
    public ResponseEntity<MaintenanceRecord> createMaintenanceRecord(@RequestParam DeviceType deviceType, @RequestParam Long deviceId, @RequestBody MaintenanceRecord record) {
        MaintenanceRecord createdRecord = maintenanceRecordService.createMaintenanceRecord(deviceType, deviceId, record);
        return ResponseEntity.ok(createdRecord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceRecord> updateMaintenanceRecord(@PathVariable Long id, @RequestBody MaintenanceRecord record) {
        MaintenanceRecord updatedRecord = maintenanceRecordService.updateMaintenanceRecord(id, record);
        return ResponseEntity.ok(updatedRecord);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRecord> getMaintenanceRecord(@PathVariable Long id) {
        return maintenanceRecordService.getMaintenanceRecord(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/device")
    public ResponseEntity<List<MaintenanceRecord>> getMaintenanceRecordsByDevice(@RequestParam DeviceType deviceType, @RequestParam Long deviceId) {
        List<MaintenanceRecord> records = maintenanceRecordService.getMaintenanceRecordsByDevice(deviceType, deviceId);
        return ResponseEntity.ok(records);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenanceRecord(@PathVariable Long id) {
        maintenanceRecordService.deleteMaintenanceRecord(id);
        return ResponseEntity.noContent().build();
    }
}
