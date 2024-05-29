package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.PortType;
import com.ajoloNET.ProyectFinal.entities.Switch;
import com.ajoloNET.ProyectFinal.repositories.SwitchRepository;
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
public class SwitchServiceImpl implements SwitchService {

    private final SwitchRepository switchRepository;

    @Override
    public Switch readByName(String name) {
        return this.switchRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Switch no encontrado"));
    }

    @Override
    public Optional<Switch> findById(Long id) {
        return switchRepository.findById(id);
    }

    @Override
    public Switch create(Switch aSwitch) {
        aSwitch.getPorts().forEach(port -> {
            if (Objects.isNull(port.getPortType())){
                port.setPortType(PortType.SWITCH);
            }
        });
        return this.switchRepository.save(aSwitch);
    }

    @Override
    public Switch update(Switch aSwitch, String name) {
        var switchToUpdate = this.switchRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Switch no encontrado"));
        switchToUpdate.setId(aSwitch.getId());
        switchToUpdate.setName(aSwitch.getName());
        switchToUpdate.setPorts(aSwitch.getPorts());
        switchToUpdate.setRack(aSwitch.getRack());
        switchToUpdate.setPoe(aSwitch.isPoe());
        switchToUpdate.setAdministrable(aSwitch.isAdministrable());
        return this.switchRepository.save(switchToUpdate);
    }

    @Override
    public void delete(String name) {

    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public List<Switch> getEverything() {
        return (List<Switch>) switchRepository.findAll();
    }
}
