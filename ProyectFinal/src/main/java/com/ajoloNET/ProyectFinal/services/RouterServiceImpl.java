package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
import com.ajoloNET.ProyectFinal.repositories.RouterRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class RouterServiceImpl implements RouterService {

    private final RouterRepository routerRepository;

    private final PortRepository portRepository;

    @Override
    public Router readByName(String name) {
        return this.routerRepository.findByName(name)
                .orElseThrow(() -> new NoSuchElementException("Router not found"));
    }

    @Override
    public Optional<Router> findById(Long id) {
        return Optional.ofNullable(this.routerRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Router not found")));
    }

    @Override
    public Router create(Router router) {
        router.setDeviceType("router");
        Router savedRouter = this.routerRepository.save(router);

        // Crea los puertos para el router
        createPortsForRouter(savedRouter);

        // Guarda nuevamente el router con los puertos (opcional)
        return this.routerRepository.save(savedRouter);
    }


    @Override
    public Router update(Router router, String name) {
        var routerToUpdate = this.routerRepository.findByName(name)
                .orElseThrow(() -> new NoSuchElementException("Router not found"));
        routerToUpdate.setName(router.getName());
        routerToUpdate.setPorts(router.getPorts());
        routerToUpdate.setNumberOfPorts(router.getNumberOfPorts());
        routerToUpdate.setRack(router.getRack());

        return this.routerRepository.save(routerToUpdate);
    }

    @Override
    public Router updateById(Router router, Long id) {
        var routerUpdateId = this.routerRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Router not found"));
        routerUpdateId.setName(router.getName());
        routerUpdateId.setNumberOfPorts(router.getNumberOfPorts());
        routerUpdateId.setPorts(router.getPorts());
        routerUpdateId.setRack(router.getRack());

        return this.routerRepository.save(routerUpdateId);
    }

    @Override
    public void delete(String name) {
        var routerToDelete = this.routerRepository.findByName(name)
                .orElseThrow(() -> new NoSuchElementException("Router not found"));
        this.routerRepository.delete(routerToDelete);
    }

    @Override
    public void deleteById(Long id) {
        this.routerRepository.deleteById(id);

    }


    @Override
    public Router createPortsForRouter(Router router) {
        Set<Port> ports = new HashSet<>();
        for (int i = 1; i <= router.getNumberOfPorts(); i++) {
            Port port = new Port();
            port.setRouter(router);
            port.setPortNumber(i);
            ports.add(port);
        }
        portRepository.saveAll(ports);
        router.setPorts(ports);
        return router;
    }

    @Override
    public List<Router> getEverything() {
        return (List<Router>) routerRepository.findAll();
    }


//    @Override
//    public List<Router> findMatchByName(String name) {
//        return routerRepository.findMatchByName(name);
//
//    }
}
