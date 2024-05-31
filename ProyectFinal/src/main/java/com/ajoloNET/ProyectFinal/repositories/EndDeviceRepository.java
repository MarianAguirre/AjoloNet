package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EndDeviceRepository extends JpaRepository<EndDevice, Long> {

    Optional<EndDevice> findByName(String name);
}
