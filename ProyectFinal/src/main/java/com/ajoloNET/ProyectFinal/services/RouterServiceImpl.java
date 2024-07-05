package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Area;
import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.Rack;
import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
import com.ajoloNET.ProyectFinal.repositories.RackRepository;
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
    private final RackRepository rackRepository;
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
        if (router.getRackName() != null) {
            Rack rack = rackRepository.findByName(router.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Area not found"));
            router.setRack(rack);
        }

        // Guardar el Router inicialmente
        Router savedRouter = this.routerRepository.save(router);

        // Crea los puertos para el router
        createPortsForRouter(savedRouter);

        // Guarda nuevamente el router con los puertos (opcional)
        return this.routerRepository.save(savedRouter);
    }


    @Override
    @Transactional
    public Router update(Router router, String name) {
        var routerToUpdate = this.routerRepository.findByName(name)
                .orElseThrow(() -> new NoSuchElementException("Router not found"));
        routerToUpdate.setName(router.getName());
        routerToUpdate.setNumberOfPorts(router.getNumberOfPorts());
        routerToUpdate.setIpAddress(router.getIpAddress());

        // Si se proporciona un nombre de rack, busca y asigna el rack al router
        if (router.getRackName() != null) {
            Rack rack = rackRepository.findByName(router.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Rack not found"));
            routerToUpdate.setRack(rack);
        }

        // Actualiza los puertos del router según el número de puertos
        updatePortsForRouter(routerToUpdate);

        return this.routerRepository.save(routerToUpdate);
    }

    @Override
    @Transactional
    public Router updateById(Router router, Long id) {
        var routerUpdateId = this.routerRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Router not found"));
        routerUpdateId.setName(router.getName());
        routerUpdateId.setNumberOfPorts(router.getNumberOfPorts());
        routerUpdateId.setIpAddress(router.getIpAddress());

        // Si se proporciona un nombre de rack, busca y asigna el rack al router
        if (router.getRackName() != null) {
            Rack rack = rackRepository.findByName(router.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Rack not found"));
            routerUpdateId.setRack(rack);
        }

        // Actualiza los puertos del router según el número de puertos
        updatePortsForRouter(routerUpdateId);

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





    private void updatePortsForRouter(Router router) {
        Set<Port> currentPorts = router.getPorts();
        int desiredNumberOfPorts = router.getNumberOfPorts();

        // Remover puertos en exceso
        if (currentPorts.size() > desiredNumberOfPorts) {
            Iterator<Port> iterator = currentPorts.iterator();
            while (iterator.hasNext() && currentPorts.size() > desiredNumberOfPorts) {
                Port port = iterator.next();
                iterator.remove();
                portRepository.delete(port);
            }
        }

        // Añadir puertos adicionales si es necesario
        for (int i = currentPorts.size() + 1; i <= desiredNumberOfPorts; i++) {
            Port port = new Port();
            port.setRouter(router);
            port.setPortNumber(i);
            currentPorts.add(port);
        }
    }


//    @Override
//    public List<Router> findMatchByName(String name) {
//        return routerRepository.findMatchByName(name);
//
//    }
}
