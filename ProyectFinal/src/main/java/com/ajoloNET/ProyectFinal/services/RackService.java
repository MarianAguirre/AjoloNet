package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Rack;

import java.util.List;
import java.util.Optional;

public interface RackService {

    Optional<Rack> findById(Long id);
    Rack create(Rack rack);
    Rack update(Rack rack, Long id);
    void deleteById(Long id);

    List<Rack>getEverything();
}
