package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.EndDevice;

import java.util.List;
import java.util.Optional;

public interface EndDeviceService {

    EndDevice readByName(String name);
    Optional<EndDevice> findById (Long id);
    EndDevice create(EndDevice endDevice);
    EndDevice update(EndDevice endDevice, String name);
    void delete(String name);
    void deleteById(Long id);

    EndDevice createPortsForEndDevice(EndDevice endDevice);

    List<EndDevice> getEverything();
    //List<EndDevice>findMatchByName(String name);
}
