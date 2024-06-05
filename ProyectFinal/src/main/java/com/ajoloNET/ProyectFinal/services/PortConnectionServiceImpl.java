package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.PortConnection;
import com.ajoloNET.ProyectFinal.repositories.PortConnectionRepository;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class PortConnectionServiceImpl implements PortConnectionService{

    private final PortConnectionRepository portConnectionRepository;

    private final PortRepository portRepository;

    @Override
    public Optional<PortConnection> getConnectionById(Long id) {
        return Optional.ofNullable(this.portConnectionRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Connection not found")));
    }

    @Override
    public PortConnection createConnection(Long sourcePortId, Long destinationPortId) {
        Port sourcePort = portRepository.findById(sourcePortId)
                .orElseThrow(()->new NoSuchElementException("Source port not found"));
        Port destinationPort = portRepository.findById(destinationPortId)
                .orElseThrow(()->new NoSuchElementException("Destination port not found"));

        PortConnection connection = new PortConnection();
        connection.setSourcePort(sourcePort);
        connection.setDestinationPort(destinationPort);

        return portConnectionRepository.save(connection);
    }

    @Override
    public PortConnection update(PortConnection portConnection, Long id) {
        PortConnection existingConnection = portConnectionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Connection not found"));

        existingConnection.setSourcePort(portConnection.getSourcePort());
        existingConnection.setDestinationPort(portConnection.getDestinationPort());

        return portConnectionRepository.save(existingConnection);
    }

    @Override
    public void deleteConnection(Long id) {
        PortConnection connectionToDelete = portConnectionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Connection not found"));

        Port sourcePort = connectionToDelete.getSourcePort();
        Port destinationPort = connectionToDelete.getDestinationPort();

        sourcePort.setSourceConnection(null);
        destinationPort.setDestinationConnection(null);

        portRepository.save(sourcePort);
        portRepository.save(destinationPort);

        portConnectionRepository.delete(connectionToDelete);

    }

    @Override
    public List<PortConnection> getAllConnections() {
        return (List<PortConnection>) portConnectionRepository.findAll();
    }
}
