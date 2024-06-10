package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.PortType;
import com.ajoloNET.ProyectFinal.repositories.EndDeviceRepository;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class EndDeviceServiceImpl implements EndDeviceService{

    private final EndDeviceRepository endDeviceRepository;

    private final PortRepository portRepository;

    @Override
    public EndDevice readByName(String name) {
        return this.endDeviceRepository.findByName(name)
                .orElseThrow(()-> new NoSuchElementException("End Device not found"));
    }

    @Override
    public Optional<EndDevice> findById(Long id) {
        return Optional.ofNullable(this.endDeviceRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("End Device not found")));
    }

    @Override
    public EndDevice create(EndDevice endDevice) {
        endDevice.getPorts().forEach(port -> {
            if (Objects.isNull(port.getPortType())){
                port.setPortType(PortType.END_DEVICE);
            }
        });
        return this.endDeviceRepository.save(endDevice);
    }

    @Override
    public EndDevice update(EndDevice endDevice, String name) {
        var enDeviceToUpdate = this.endDeviceRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("End Device not found"));
        enDeviceToUpdate.setId(endDevice.getId());
        enDeviceToUpdate.setName(endDevice.getName());
        enDeviceToUpdate.setPorts(endDevice.getPorts());
        enDeviceToUpdate.setArea(endDevice.getArea());
        enDeviceToUpdate.setNumberOfPorts(endDevice.getNumberOfPorts());
        return this.endDeviceRepository.save(enDeviceToUpdate);
    }

    @Override
    public void delete(String name) {
        var enDeviceToDelete = this.endDeviceRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("End Device not found"));
        this.endDeviceRepository.delete(enDeviceToDelete);

    }


    @Override
    public EndDevice createPortsForEndDevice(EndDevice endDevice) {
        Set<Port> ports = new HashSet<>();
        for (int i = 1; i <= endDevice.getNumberOfPorts(); i++) {
            Port port = new Port();
            port.setEndDevice(endDevice);
            port.setPortType(PortType.END_DEVICE);
            port.setPortNumber(i);
            ports.add(port);
        }
        portRepository.saveAll(ports);
        endDevice.setPorts(ports);
        return endDevice;
    }

    @Override
    public List<EndDevice> getEverything() {
        return (List<EndDevice>) endDeviceRepository.findAll();
    }

    /*
     @Override
    public List<EndDevice> findMatchByName(String name) {
        return List.of();
    }
    */
}
