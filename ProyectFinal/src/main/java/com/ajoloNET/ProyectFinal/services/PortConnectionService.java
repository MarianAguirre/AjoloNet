package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.DTOs.PortConectionDTO;
import com.ajoloNET.ProyectFinal.entities.PortConnection;

import java.util.List;
import java.util.Optional;

public interface PortConnectionService {

    Optional<PortConnection> getConnectionById (Long id);
    PortConnection createConnection(PortConectionDTO request);
    PortConnection update(PortConnection portConnection, Long id);
    void deleteConnection(Long id);

    List<PortConnection>getAllConnections();
}
