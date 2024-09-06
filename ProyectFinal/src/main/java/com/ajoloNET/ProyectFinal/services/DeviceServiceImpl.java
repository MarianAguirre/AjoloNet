package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.DTOs.DevicesDTO;
import com.ajoloNET.ProyectFinal.repositories.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class DeviceServiceImpl{

    private final RouterRepository routerRepository;
    private final SwitchRepository switchRepository;
    private final PatchPanelRepository patchPanelRepository;
    private final EndDeviceRepository endDeviceRepository;
    private final ServersRepository serversRepository;

    public DevicesDTO getAllDevices() {
        DevicesDTO devicesDTO = new DevicesDTO();
        devicesDTO.setRouters(routerRepository.findAll());
        devicesDTO.setSwitches(switchRepository.findAll());
        devicesDTO.setPatchPanels(patchPanelRepository.findAll());
        devicesDTO.setEndDevices(endDeviceRepository.findAll());
        devicesDTO.setServers(serversRepository.findAll());

        return devicesDTO;
    }
}