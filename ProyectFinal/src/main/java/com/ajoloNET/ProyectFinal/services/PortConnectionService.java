package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.PortConnection;

import java.util.List;
import java.util.Optional;

public interface PortConnectionService {

    Optional<PortConnection> getConnectionById (Long id);
    PortConnection createConnection(Long sourcePortId, Long destinationPortId);
    PortConnection update(PortConnection portConnection, Long id);
    void deleteConnection(Long id);

    List<PortConnection>getAllConnections();
}
