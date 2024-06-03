package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Rack;
import com.ajoloNET.ProyectFinal.repositories.RackRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class RackServiceImpl implements RackService{

    private RackRepository rackRepository;

    @Override
    public Optional<Rack> findById(Long id) {
        return Optional.ofNullable(this.rackRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Rack not found")));
    }

    @Override
    public Rack create(Rack rack) {
        return this.rackRepository.save(rack);
    }

    @Override
    public Rack update(Rack rack, Long id) {
        var RackToUpdate = this.rackRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Rack not found"));
        RackToUpdate.setId(rack.getId());
        RackToUpdate.setPowerSplit(rack.getPowerSplit());
        RackToUpdate.setaSwitch(rack.getaSwitch());
        RackToUpdate.setRouters(rack.getRouters());
        RackToUpdate.setPatchPanels(rack.getPatchPanels());
        return this.rackRepository.save(RackToUpdate);
    }

    @Override
    public void deleteById(Long id) {
        var RackToDeleteById = this.rackRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Rack not found"));
        this.rackRepository.delete(RackToDeleteById);

    }

    @Override
    public List<Rack> getEverything() {
        return (List<Rack>) rackRepository.findAll();
    }
}
