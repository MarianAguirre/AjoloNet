package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Area;

import java.util.List;
import java.util.Optional;

public interface AreaService {

    Area readByName(String name);
    Optional<Area> findById (Long id);
    Area crate(Area area);
    Area update(Area area, String name);
    Area updateById(Area area, Long id);
    void delete(String name);
    void deleteById(Long id);

    List<Area>getEverything();
}
