package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Switch;

import java.util.List;
import java.util.Optional;

public interface SwitchService {

    Optional<Switch> findById(Long id);
    Switch create(Switch aSwitch);
    Switch updateById(Switch aSwitch, Long id);
    void deleteById(Long id);

    Switch createPortsForSwitch(Switch aSwitch);

    List<Switch>getEverything();
}
