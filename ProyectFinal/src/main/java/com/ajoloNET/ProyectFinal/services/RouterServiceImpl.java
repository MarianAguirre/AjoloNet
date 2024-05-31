package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.PortType;
import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.repositories.RouterRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class RouterServiceImpl implements RouterService{

    private final RouterRepository routerRepository;

    @Override
    public Router readByName(String name) {
        return this.routerRepository.findByName(name)
                .orElseThrow(()-> new NoSuchElementException("Router not found"));
    }

    @Override
    public Optional<Router> findById(Long id) {
        return routerRepository.findById(id);
    }

    @Override
    public Router create(Router router) {
        router.getPorts().forEach(port -> {
            if(Objects.isNull(port.getPortType())){
                port.setPortType(PortType.ROUTER);
            }
        });
        return this.routerRepository.save(router);
    }

    @Override
    public Router update(Router router, String name) {
        var routerToUpdate = this.routerRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Router not found"));
        routerToUpdate.setId(router.getId());
        routerToUpdate.setName(router.getName());
        routerToUpdate.setPorts(router.getPorts());

        return this.routerRepository.save(routerToUpdate);
    }

    @Override
    public void delete(String name) {
        var routerToDelete = this.routerRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Router not found"));
        this.routerRepository.delete(routerToDelete);
    }

    @Override
    public void deleteById(Long id) {
        var routerToDeleteById = this.routerRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Router not found"));
        this.routerRepository.delete(routerToDeleteById);
    }

    @Override
    public List<Router> getEverything() {
        return (List<Router>) routerRepository.findAll();
    }

    /*
     @Override
    public List<Router> findMatchByName(String name) {
        return routerRepository.findMatchByName(name);
     }
    */

}
