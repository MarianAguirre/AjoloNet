package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Cisco2900Config;
import com.ajoloNET.ProyectFinal.repositories.CiscoTestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CiscoTestService {

    private final CiscoTestRepository ciscoConfigRepository;

    // Guardar la configuración
    public Cisco2900Config saveConfig(Cisco2900Config ciscoConfig) {
        return ciscoConfigRepository.save(ciscoConfig);
    }

    // Consultar todas las configuraciones
    public List<Cisco2900Config> getAllConfigs() {
        return ciscoConfigRepository.findAll();
    }

    // Consultar una configuración por ID
    public Optional<Cisco2900Config> getConfigById(Long id) {
        return ciscoConfigRepository.findById(id);
    }
}
