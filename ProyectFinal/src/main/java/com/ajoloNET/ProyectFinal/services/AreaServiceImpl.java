package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Area;
import com.ajoloNET.ProyectFinal.repositories.AreaRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class AreaServiceImpl implements AreaService{

    private AreaRepository areaRepository;

    @Override
    public Area readByName(String name) {
        return this.areaRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Area not found"));
    }

    @Override
    public Optional<Area> findById(Long id) {
        return Optional.ofNullable(this.areaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Area not found")));
    }

    @Override
    public Area crate(Area area) {
        return this.areaRepository.save(area);
    }

    @Override
    public Area update(Area area, String name) {
        var AreaToUpdate = this.areaRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Area not found"));
        AreaToUpdate.setId(area.getId());
        AreaToUpdate.setName(area.getName());
        AreaToUpdate.setEndDevices(area.getEndDevices());
        return this.areaRepository.save(AreaToUpdate);
    }

    @Override
    public void delete(String name) {
        var AreaToDelete = this.areaRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Area not found"));
        this.areaRepository.delete(AreaToDelete);

    }

    @Override
    public void deleteById(Long id) {
        var AreaToDeleteById = this.areaRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Area not found"));
        this.areaRepository.delete(AreaToDeleteById);

    }

    @Override
    public List<Area> getEverything() {
        return (List<Area>) areaRepository.findAll();
    }
}
