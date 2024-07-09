package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.DTOs.PortConectionDTO;
import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.PortConnection;
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
public class PortConnectionServiceImpl implements PortConnectionService{

    @Autowired
    private PortConnectionRepository portConnectionRepository;

    private final PortRepository portRepository;

    @Override
    public Optional<PortConnection> getConnectionById(Long id) {
        return Optional.ofNullable(this.portConnectionRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Connection not found")));
    }

    @Override
    public PortConnection createConnection(PortConectionDTO request) {
        PortConnection connection = new PortConnection();
        connection.setSourceType(request.getSourceType());
        connection.setSourceId(request.getSourceId());
        connection.setSourcePort(request.getSourcePort());

//        Port sourceConection = new Port();
//        sourceConection.setsSwitch(connection);





         // Ejemplo de estado ocupado

        connection.setDestinationType(request.getDestinationType());
        connection.setDestinationId(request.getDestinationId());
        connection.setDestinationPort(request.getDestinationPort());

//        Port destinationConection = new Port();
        // Ejemplo de estado ocupado

        // Guardar la conexión usando la instancia de portConnectionRepository
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



    }
    @Override
    public List<PortConnection> getAllConnections() {
        return (List<PortConnection>) portConnectionRepository.findAll();
    }
}
