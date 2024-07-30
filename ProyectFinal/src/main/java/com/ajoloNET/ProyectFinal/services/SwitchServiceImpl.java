package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.*;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
import com.ajoloNET.ProyectFinal.repositories.RackRepository;
import com.ajoloNET.ProyectFinal.repositories.SwitchRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class SwitchServiceImpl implements SwitchService {

    private final SwitchRepository switchRepository;
    private final RackRepository rackRepository;
    private final PortRepository portRepository;

    @Override
    public Switch readByName(String name) {
        return this.switchRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Switch not found"));
    }

    @Override
    public Optional<Switch> findById(Long id) {
        return Optional.ofNullable(this.switchRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Switch not found")));
    }

    @Override
    public Switch create(Switch aSwitch) {
        aSwitch.setDeviceType("switch");
        if (aSwitch.getRackName() != null) {
            Rack rack = rackRepository.findByName(aSwitch.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Area not found"));
            aSwitch.setRack(rack);
        }

        // Guardar el Switch inicialmente
        Switch savedSwitch = this.switchRepository.save(aSwitch);

        // Crea los puertos para el router
        createPortsForSwitch(savedSwitch);

        // Guarda nuevamente el router con los puertos (opcional)
        return this.switchRepository.save(savedSwitch);
    }

    @Override
    public Switch update(Switch aSwitch, String name) {
        var switchToUpdate = this.switchRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Switch not found"));
        switchToUpdate.setName(aSwitch.getName());
        switchToUpdate.setNumberOfPorts(aSwitch.getNumberOfPorts());
        switchToUpdate.setPoe(aSwitch.isPoe());
        switchToUpdate.setManageable(aSwitch.isManageable());
        switchToUpdate.setIpAddress(aSwitch.getIpAddress());
        switchToUpdate.setNameVlan(aSwitch.getNameVlan());
        switchToUpdate.setVlanId(aSwitch.getVlanId());
        switchToUpdate.setMac(aSwitch.getMac());

        // Si se proporciona un nombre de rack, busca y asigna el rack al router
        if (aSwitch.getRackName() != null) {
            Rack rack = rackRepository.findByName(aSwitch.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Rack not found"));
            switchToUpdate.setRack(rack);
        }

        // Actualiza los puertos del switch según el número de puertos
        updatePortsForSwitch(switchToUpdate);

        return this.switchRepository.save(switchToUpdate);
    }

    @Override
    public Switch updateById(Switch aSwitch, Long id) {
        var switchToUpdateId = this.switchRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Switch not found"));
        switchToUpdateId.setName(aSwitch.getName());
        switchToUpdateId.setNumberOfPorts(aSwitch.getNumberOfPorts());
        switchToUpdateId.setPoe(aSwitch.isPoe());
        switchToUpdateId.setManageable(aSwitch.isManageable());
        switchToUpdateId.setNameVlan(aSwitch.getNameVlan());
        switchToUpdateId.setVlanId(aSwitch.getVlanId());
        switchToUpdateId.setIpAddress(aSwitch.getIpAddress());
        switchToUpdateId.setMac(aSwitch.getMac());
        // Si se proporciona un nombre de rack, busca y asigna el rack al router
        if (aSwitch.getRackName() != null) {
            Rack rack = rackRepository.findByName(aSwitch.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Rack not found"));
            switchToUpdateId.setRack(rack);
        }


        // Actualiza los puertos del switch según el número de puertos
        updatePortsForSwitch(switchToUpdateId);

        return this.switchRepository.save(switchToUpdateId);
    }

    @Override
    public void delete(String name) {
        var switchToDelete = this.switchRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Switch not found"));
        this.switchRepository.delete(switchToDelete);

    }

    @Override
    public void deleteById(Long id) {
        this.switchRepository.deleteById(id);

    }


    @Override
    public Switch createPortsForSwitch(Switch aSwitch) {
        Set<Port> ports = new HashSet<>();
        for (int i = 1; i <= aSwitch.getNumberOfPorts(); i++) {
            Port port = new Port();
            port.setsSwitch(aSwitch);
            port.setPortNumber(i);
            port.setStatus(PortStatus.AVAILABLE);
            ports.add(port);
        }
        portRepository.saveAll(ports);
        aSwitch.setPorts(ports);
        return aSwitch;
    }

    @Override
    public List<Switch> getEverything() {
        return (List<Switch>) switchRepository.findAll();
        
    }





    private void updatePortsForSwitch(Switch aSwitch) {
        Set<Port> currentPorts = aSwitch.getPorts();
        int desiredNumberOfPorts = aSwitch.getNumberOfPorts();

        // Remover puertos en exceso
        if (currentPorts.size() > desiredNumberOfPorts) {
            Iterator<Port> iterator = currentPorts.iterator();
            while (iterator.hasNext() && currentPorts.size() > desiredNumberOfPorts) {
                Port port = iterator.next();
                iterator.remove();
                portRepository.delete(port);
            }
        }

        // Añadir puertos adicionales si es necesario
        for (int i = currentPorts.size() + 1; i <= desiredNumberOfPorts; i++) {
            Port port = new Port();
            port.setsSwitch(aSwitch);
            port.setPortNumber(i);
            port.setStatus(PortStatus.AVAILABLE);
            currentPorts.add(port);
        }
    }

}


