package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PortRepository extends JpaRepository<Port, Long> {

    @Query("SELECT p FROM Port p WHERE " +
            "((:deviceType = 'ROUTER' AND p.router.id = :deviceId) OR " +
            "(:deviceType = 'SWITCH' AND p.sSwitch.id = :deviceId) OR " +
            "(:deviceType = 'PATCH_PANEL' AND p.patchPanel.id = :deviceId) OR " +
            "(:deviceType = 'END_DEVICE' AND p.endDevice.id = :deviceId)) " +
            "AND p.portNumber = :portNumber")
    Optional<Port> findByDeviceAndPort(@Param("deviceType") String deviceType, @Param("deviceId") Long deviceId, @Param("portNumber") int portNumber);

    List<Port> findByRouter(Router router);
    List<Port> findBySSwitch(Switch sSwitch);
    List<Port> findByPatchPanel(PatchPanel patchPanel);
    List<Port> findByEndDevice(EndDevice endDevice);
}
