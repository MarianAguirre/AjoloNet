package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Router;

import java.util.List;
import java.util.Optional;

public interface RouterService {

    Optional<Router> findById (Long id);
    Router create(Router router);
    Router updateById(Router router, Long id);
    void deleteById(Long id);

    Router createPortsForRouter(Router router);

    List<Router>getEverything();
//    List<Router>findMatchByName(String name);

}
