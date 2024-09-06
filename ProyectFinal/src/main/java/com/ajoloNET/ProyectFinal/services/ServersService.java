package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.*;
import com.ajoloNET.ProyectFinal.repositories.AreaRepository;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
import com.ajoloNET.ProyectFinal.repositories.RackRepository;
import com.ajoloNET.ProyectFinal.repositories.ServersRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class ServersService {

    private final ServersRepository serversRepository;
    private final RackRepository rackRepository;
    private final PortRepository portRepository;
    private final AreaRepository areaRepository;

    // Encuentra un servidor por su ID
    public Servers findById(Long id) {
        return serversRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Server not found"));
    }

    // Crea un nuevo servidor y asocia sus puertos
    public Servers create(Servers servers) {
        servers.setDeviceType("server");

        // Verificar y asignar el área si se proporciona
        if (servers.getArea() != null) {
            Area area = areaRepository.findByName(String.valueOf(servers.getArea()))
                    .orElseThrow(() -> new NoSuchElementException("Area not found"));
            servers.setArea(area);
        }

        // Guardar el servidor inicialmente
        Servers savedServer = serversRepository.save(servers);

        // Crear los puertos para el servidor
        createPortsForServer(savedServer);

        // Guardar nuevamente el servidor con los puertos
        return serversRepository.save(savedServer);
    }

    // Actualiza un servidor por su ID
    public Servers updateById(Servers servers, Long id) {
        Servers serversToUpdate = serversRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Server not found"));

        // Actualiza las propiedades del servidor
        serversToUpdate.setName(servers.getName());
        serversToUpdate.setNumberOfPorts(servers.getNumberOfPorts());
        serversToUpdate.setIpAddress(servers.getIpAddress());
        serversToUpdate.setMac(servers.getMac());

        // Si se proporciona un nombre de rack, busca y asigna el rack al servidor
        if (servers.getRackName() != null) {
            Rack rack = rackRepository.findByName(servers.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Rack not found"));
            serversToUpdate.setRack(rack);
        }

        // Actualiza la Area si se proporciona
        if (servers.getArea() != null) {
            Area area = areaRepository.findByName(String.valueOf(servers.getArea()))
                    .orElseThrow(() -> new NoSuchElementException("Area not found"));
            serversToUpdate.setArea(area);
        } else {
            serversToUpdate.setArea(null); // Limpiar la asociación si no se proporciona una nueva Area
        }

        // Actualiza o crea los puertos del servidor
        updateOrCreatePorts(serversToUpdate, servers);

        // Guarda el servidor actualizado
        return serversRepository.save(serversToUpdate);
    }

    // Actualiza o crea los puertos asociados a un servidor
    private void updateOrCreatePorts(Servers serversToUpdate, Servers updatedServers) {
        Set<Port> existingPorts = serversToUpdate.getPorts();
        Set<Port> updatedPorts = new HashSet<>();

        for (Port port : updatedServers.getPorts()) {
            if (port.getServers() == null) {
                port.setServers(serversToUpdate);
            }
            updatedPorts.add(port);
        }

        // Remueve puertos no actualizados
        existingPorts.removeIf(existingPort -> !updatedPorts.contains(existingPort));

        // Guarda los puertos actualizados en el servidor
        serversToUpdate.setPorts(updatedPorts);
    }

    // Elimina un servidor por su ID
    public void deleteById(Long id) {
        serversRepository.deleteById(id);
    }

    // Crea los puertos para un servidor específico
    public void createPortsForServer(Servers servers) {
        Set<Port> ports = new HashSet<>();
        for (int i = 1; i <= servers.getNumberOfPorts(); i++) {
            Port port = new Port();
            port.setServers(servers);
            port.setPortNumber(i);
            port.setStatus(PortStatus.AVAILABLE);
            ports.add(port);
        }
        portRepository.saveAll(ports);
        servers.setPorts(ports);
    }

    // Obtiene todos los servidores con sus relaciones
    public List<Servers> getEverything() {
        return serversRepository.findAll();
    }
}
