package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.MaintenanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {

    List<MaintenanceRecord> findByDeviceTypeAndDeviceId(DeviceType deviceType, Long deviceId);
}
