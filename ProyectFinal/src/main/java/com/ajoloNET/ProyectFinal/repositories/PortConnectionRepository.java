package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.PortConnection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortConnectionRepository extends JpaRepository<PortConnection, Long> {
    List<PortConnection> findBySourceTypeAndSourceId(DeviceType sourceType, Long sourceId);
    List<PortConnection> findByDestinationTypeAndDestinationId(DeviceType destinationType, Long destinationId);
}
