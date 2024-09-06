package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.MaintenanceRecord;
import com.ajoloNET.ProyectFinal.repositories.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class MaintenanceRecordService {

    private final MaintenanceRecordRepository maintenanceRecordRepository;

    private final RouterRepository routerRepository;

    private final SwitchRepository switchRepository;

    private final PatchPanelRepository patchPanelRepository;

    private final EndDeviceRepository endDeviceRepository;

    private final ServersRepository serversRepository;

    public MaintenanceRecord createMaintenanceRecord(DeviceType deviceType, Long deviceId, MaintenanceRecord record) {
        switch (deviceType) {
            case ROUTER:
                routerRepository.findById(deviceId).orElseThrow(() -> new IllegalArgumentException("Router not found"));
                break;
            case SWITCH:
                switchRepository.findById(deviceId).orElseThrow(() -> new IllegalArgumentException("Switch not found"));
                break;
            case PATCH_PANEL:
                patchPanelRepository.findById(deviceId).orElseThrow(() -> new IllegalArgumentException("Patch Panel not found"));
                break;
            case END_DEVICE:
                endDeviceRepository.findById(deviceId).orElseThrow(() -> new IllegalArgumentException("End Device not found"));
                break;
            case SERVER:
                serversRepository.findById(deviceId).orElseThrow(()-> new IllegalArgumentException("Server not found"));
            default:
                throw new IllegalArgumentException("Invalid device type");
        }
        record.setDeviceType(deviceType);
        record.setDeviceId(deviceId);
        return maintenanceRecordRepository.save(record);
    }

    public MaintenanceRecord updateMaintenanceRecord(Long id, MaintenanceRecord updatedRecord) {
        MaintenanceRecord existingRecord = maintenanceRecordRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Maintenance record not found"));
        existingRecord.setMaintenanceDate(updatedRecord.getMaintenanceDate());
        existingRecord.setDeviceName(updatedRecord.getDeviceName());
        existingRecord.setPerformedBy(updatedRecord.getPerformedBy());
        existingRecord.setDescription(updatedRecord.getDescription());
        existingRecord.setMaterialsUsed(updatedRecord.getMaterialsUsed());
        return maintenanceRecordRepository.save(existingRecord);
    }

    public Optional<MaintenanceRecord> getMaintenanceRecord(Long id) {
        return maintenanceRecordRepository.findById(id);
    }

    public List<MaintenanceRecord> getMaintenanceRecordsByDevice(DeviceType deviceType, Long deviceId) {
        return maintenanceRecordRepository.findByDeviceTypeAndDeviceId(deviceType, deviceId);
    }

    public void deleteMaintenanceRecord(Long id) {
        maintenanceRecordRepository.deleteById(id);
    }

    public List<MaintenanceRecord> getAll(){
        return maintenanceRecordRepository.findAll();
    }
}
