package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Switch;

import java.util.List;
import java.util.Optional;

public interface SwitchService {

    Switch readByName(String name);
    Optional<Switch> findById(Long id);
    Switch create(Switch aSwitch);
    Switch update(Switch aSwitch, String name);
    Switch updateById(Switch aSwitch, Long id);
    void delete(String name);
    void deleteById(Long id);

    Switch createPortsForSwitch(Switch aSwitch);

    List<Switch>getEverything();
}
