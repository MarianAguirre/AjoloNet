package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Router;

import java.util.List;
import java.util.Optional;

public interface RouterService {

    Router readByName(String name);
    Optional<Router> findById (Long id);
    Router create(Router router);
    Router update(Router router, String name);
    Router updateById(Router router, Long id);
    void delete(String name);
    void deleteById(Long id);

    Router createPortsForRouter(Router router);

    List<Router>getEverything();
    //List<Router>findMatchByName(String name);

}
