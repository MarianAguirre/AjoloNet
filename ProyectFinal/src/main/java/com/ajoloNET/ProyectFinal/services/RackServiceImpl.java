package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Rack;
import com.ajoloNET.ProyectFinal.repositories.RackRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class RackServiceImpl implements RackService{

    private final RackRepository rackRepository;

    @Override
    public Rack readByName(String name) {
        return this.rackRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Rack not found"));
    }

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
    public Rack update(Rack rack, String name) {
        var RackToUpdate = this.rackRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Rack not found"));
        RackToUpdate.setId(rack.getId());
        RackToUpdate.setName(rack.getName());
        RackToUpdate.setPowerSplit(rack.getPowerSplit());
        RackToUpdate.setaSwitch(rack.getaSwitch());
        RackToUpdate.setRouters(rack.getRouters());
        RackToUpdate.setPatchPanels(rack.getPatchPanels());
        return this.rackRepository.save(RackToUpdate);
    }

    @Override
    public void delete(String name) {
    var RackToDelete = this.rackRepository.findByName(name)
            .orElseThrow(()-> new NoSuchElementException("Rack not found"));
    this.rackRepository.delete(RackToDelete);
    }

    @Override
    public List<Rack> getEverything() {
        return (List<Rack>) rackRepository.findAll();
    }
}
