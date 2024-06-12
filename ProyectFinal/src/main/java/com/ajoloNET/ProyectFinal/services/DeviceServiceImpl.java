package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.DTOs.DevicesDTO;
import com.ajoloNET.ProyectFinal.repositories.EndDeviceRepository;
import com.ajoloNET.ProyectFinal.repositories.PatchPanelRepository;
import com.ajoloNET.ProyectFinal.repositories.RouterRepository;
import com.ajoloNET.ProyectFinal.repositories.SwitchRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.type.descriptor.java.DateJavaType;
import org.springframework.stereotype.Service;

import java.security.interfaces.RSAKey;


@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class DeviceServiceImpl{

    private final RouterRepository routerRepository;
    private final SwitchRepository switchRepository;
    private final PatchPanelRepository patchPanelRepository;
    private final EndDeviceRepository endDeviceRepository;

    public DevicesDTO getAllDevices() {
        DevicesDTO devicesDTO = new DevicesDTO();
        devicesDTO.setRouters(routerRepository.findAll());
        devicesDTO.setSwitches(switchRepository.findAll());
        devicesDTO.setPatchPanels(patchPanelRepository.findAll());
        devicesDTO.setEndDevices(endDeviceRepository.findAll());

        return devicesDTO;
    }
}