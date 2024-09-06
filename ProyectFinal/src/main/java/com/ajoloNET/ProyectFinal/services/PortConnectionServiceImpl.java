package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.*;
import com.ajoloNET.ProyectFinal.repositories.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class PortConnectionServiceImpl{

    // Repositorios necesarios
    private PortConnectionRepository portConnectionRepository;
    private RouterRepository routerRepository;
    private SwitchRepository switchRepository;
    private PatchPanelRepository patchPanelRepository;
    private EndDeviceRepository endDeviceRepository;
    private PortRepository portRepository;
    private ServersRepository serversRepository;

    // Constructor
    public void PortConnectionService(
            PortConnectionRepository portConnectionRepository,
            RouterRepository routerRepository,
            SwitchRepository switchRepository,
            PatchPanelRepository patchPanelRepository,
            EndDeviceRepository endDeviceRepository,
            PortRepository portRepository,
            ServersRepository serversRepository) {
        this.portConnectionRepository = portConnectionRepository;
        this.routerRepository = routerRepository;
        this.switchRepository = switchRepository;
        this.patchPanelRepository = patchPanelRepository;
        this.endDeviceRepository = endDeviceRepository;
        this.portRepository = portRepository;
        this.serversRepository = serversRepository;
    }


    public List<PortConnection> getConnectionsByDevice(DeviceType deviceType, Long deviceId) {
        List<PortConnection> sourceConnections = portConnectionRepository.findBySourceTypeAndSourceId(deviceType, deviceId);
        List<PortConnection> destinationConnections = portConnectionRepository.findByDestinationTypeAndDestinationId(deviceType, deviceId);

        List<PortConnection> allConnections = new ArrayList<>();
        allConnections.addAll(sourceConnections);
        allConnections.addAll(destinationConnections);

        return allConnections;
    }

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
            case SERVER:
                Servers servers = serversRepository.findById(deviceId)
                        .orElseThrow(()-> new IllegalArgumentException("Server not found"));
            default:
                throw new IllegalArgumentException("Invalid device type");
        }
    }
}
