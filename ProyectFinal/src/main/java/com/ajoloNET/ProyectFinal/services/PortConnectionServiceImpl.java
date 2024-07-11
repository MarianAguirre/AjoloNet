package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.DTOs.PortConectionDTO;
import com.ajoloNET.ProyectFinal.entities.DeviceType;
import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.PortConnection;
import com.ajoloNET.ProyectFinal.entities.PortStatus;
import com.ajoloNET.ProyectFinal.repositories.PortConnectionRepository;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
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

    @Autowired
    private PortConnectionRepository portConnectionRepository;

    @Autowired
    private PortRepository portRepository;

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
}
