package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.Port;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PortRepository extends JpaRepository<Port, Long> {

    @Query("SELECT p FROM Port p WHERE " +
            "((:deviceType = 'ROUTER' AND p.router.id = :deviceId) OR " +
            "(:deviceType = 'SWITCH' AND p.sSwitch.id = :deviceId) OR " +
            "(:deviceType = 'PATCH_PANEL' AND p.patchPanel.id = :deviceId) OR " +
            "(:deviceType = 'END_DEVICE' AND p.endDevice.id = :deviceId)) " +
            "AND p.portNumber = :portNumber")
    Optional<Port> findByDeviceAndPort(@Param("deviceType") String deviceType, @Param("deviceId") Long deviceId, @Param("portNumber") int portNumber);
}
