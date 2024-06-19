package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.Area;
import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.repositories.AreaRepository;
import com.ajoloNET.ProyectFinal.repositories.EndDeviceRepository;
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
public class AreaServiceImpl implements AreaService{

    private final AreaRepository areaRepository;
    private final EndDeviceRepository endDeviceRepository;

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
    public Area updateById(Area area, Long id) {
        var AreaToUpdateId = this.areaRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Area not found"));
        AreaToUpdateId.setName(area.getName());
        AreaToUpdateId.setEndDevices(area.getEndDevices());
        return this.areaRepository.save(AreaToUpdateId);
    }

    @Override
    public void delete(String name) {
        var areaToDelete = this.areaRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("Area not found"));

        // Desvincular manualmente los dispositivos finales
        for (EndDevice endDevice : areaToDelete.getEndDevices()) {
            endDevice.setArea(null);
            this.endDeviceRepository.save(endDevice);
        }

        this.areaRepository.delete(areaToDelete);

    }

    @Override
    public void deleteById(Long id) {
        Area areaToDeleteId = this.areaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Area not found"));

        // Desvincular manualmente los dispositivos finales
        for (EndDevice endDevice : areaToDeleteId.getEndDevices()) {
            endDevice.setArea(null);
            this.endDeviceRepository.save(endDevice);
        }

        this.areaRepository.deleteById(id);
    }

    @Override
    public List<Area> getEverything() {
        return (List<Area>) areaRepository.findAll();
    }
}
