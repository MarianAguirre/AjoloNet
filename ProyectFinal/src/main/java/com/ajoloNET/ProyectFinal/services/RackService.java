package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Rack;

import java.util.List;
import java.util.Optional;

public interface RackService {

    Rack readByName(String name);
    Optional<Rack> findById(Long id);
    Rack create(Rack rack);

    Rack update(Rack rack, String name);
    Rack updateById(Rack rack, Long id);

    void delete(String name);
    void deleteById(Long id);

    List<Rack>getEverything();
}
