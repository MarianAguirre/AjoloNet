package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.DTOs.PortConectionDTO;
import com.ajoloNET.ProyectFinal.entities.*;
import com.ajoloNET.ProyectFinal.repositories.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class PortConnectionServiceImpl{


    private final PortConnectionRepository portConnectionRepository;


    private final PortRepository portRepository;

    private final RouterRepository routerRepository;

    private final SwitchRepository switchRepository;

    private final PatchPanelRepository patchPanelRepository;

    private final EndDeviceRepository endDeviceRepository;

    @Transactional
    public PortConnection createConnection(DeviceType sourceType, Long sourceId, int sourcePort, DeviceType destinationType, Long destinationId, int destinationPort) {
        // Convertir enum a string
        String sourceTypeString = sourceType.name();
        String destinationTypeString = destinationType.name();

        // Verificar si los puertos están disponibles
        Port source = portRepository.findByDeviceAndPort(sourceTypeString, sourceId, sourcePort)
                .orElseThrow(() -> new IllegalArgumentException("Source port not found or occupied"));
        Port destination = portRepository.findByDeviceAndPort(destinationTypeString, destinationId, destinationPort)
                .orElseThrow(() -> new IllegalArgumentException("Destination port not found or occupied"));

        if (source.getStatus() == PortStatus.OCCUPIED || destination.getStatus() == PortStatus.OCCUPIED) {
            throw new IllegalStateException("One of the ports is already occupied");
        }

        // Marcar los puertos como ocupados
        source.setStatus(PortStatus.OCCUPIED);
        destination.setStatus(PortStatus.OCCUPIED);
        portRepository.save(source);
        portRepository.save(destination);

        // Crear la conexión
        PortConnection connection = new PortConnection();
        connection.setSourceType(sourceType);
        connection.setSourceId(sourceId);
        connection.setSourcePort(sourcePort);
        connection.setDestinationType(destinationType);
        connection.setDestinationId(destinationId);
        connection.setDestinationPort(destinationPort);
        return portConnectionRepository.save(connection);
    }

    public Optional<PortConnection> getConnection(Long id) {
        return portConnectionRepository.findById(id);
    }

    public void deleteConnection(Long id) {
        portConnectionRepository.findById(id).ifPresent(connection -> {
            // Liberar los puertos
            Port source = portRepository.findByDeviceAndPort(connection.getSourceType().name(), connection.getSourceId(), connection.getSourcePort())
                    .orElseThrow(() -> new IllegalArgumentException("Source port not found"));
            Port destination = portRepository.findByDeviceAndPort(connection.getDestinationType().name(), connection.getDestinationId(), connection.getDestinationPort())
                    .orElseThrow(() -> new IllegalArgumentException("Destination port not found"));

            source.setStatus(PortStatus.AVAILABLE);
            destination.setStatus(PortStatus.AVAILABLE);
            portRepository.save(source);
            portRepository.save(destination);

            portConnectionRepository.delete(connection);
        });
    }

    public List<PortConnection> getAllConnections() {
        return portConnectionRepository.findAll();
    }

    public List<Port> getPortsByDevice(DeviceType deviceType, Long deviceId) {
        switch (deviceType) {
            case ROUTER:
                Router router = routerRepository.findById(deviceId)
                        .orElseThrow(() -> new IllegalArgumentException("Router not found"));
                return portRepository.findByRouter(router);
            case SWITCH:
                Switch aSwitch = switchRepository.findById(deviceId)
                        .orElseThrow(() -> new IllegalArgumentException("Switch not found"));
                return portRepository.findBySSwitch(aSwitch);
            case PATCH_PANEL:
                PatchPanel patchPanel = patchPanelRepository.findById(deviceId)
                        .orElseThrow(() -> new IllegalArgumentException("Patch Panel not found"));
                return portRepository.findByPatchPanel(patchPanel);
            case END_DEVICE:
                EndDevice endDevice = endDeviceRepository.findById(deviceId)
                        .orElseThrow(() -> new IllegalArgumentException("End Device not found"));
                return portRepository.findByEndDevice(endDevice);
            default:
                throw new IllegalArgumentException("Invalid device type");
        }
    }
}
