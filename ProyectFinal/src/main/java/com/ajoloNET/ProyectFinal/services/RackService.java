package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Rack;

import java.util.List;
import java.util.Optional;

public interface RackService {

    Rack readByName(String name);
    Optional<Rack> findById(Long id);
    Rack create(Rack rack);

    Rack update(Rack rack, String name);

    void delete(String name);

    List<Rack>getEverything();
}
