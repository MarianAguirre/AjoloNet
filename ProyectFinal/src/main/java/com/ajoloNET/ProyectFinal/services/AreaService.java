package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Area;

import java.util.List;
import java.util.Optional;

public interface AreaService {

    Optional<Area> findById (Long id);
    Area crate(Area area);
    Area updateById(Area area, Long id);
    void deleteById(Long id);

    List<Area>getEverything();
}
