package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.entities.PortType;
import com.ajoloNET.ProyectFinal.repositories.EndDeviceRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

public class EndDeviceServiceImpl implements EndDeviceService{

    private EndDeviceRepository endDeviceRepository;

    @Override
    public EndDevice readByName(String name) {
        return this.endDeviceRepository.findByName(name)
                .orElseThrow(()-> new NoSuchElementException("End Device not found"));
    }

    @Override
    public Optional<EndDevice> findById(Long id) {
        return Optional.ofNullable(this.endDeviceRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("End Device not found")));
    }

    @Override
    public EndDevice create(EndDevice endDevice) {
        endDevice.getPorts().forEach(port -> {
            if (Objects.isNull(port.getPortType())){
                port.setPortType(PortType.END_DEVICE);
            }
        });
        return this.endDeviceRepository.save(endDevice);
    }

    @Override
    public EndDevice update(EndDevice endDevice, String name) {
        var enDeviceToUpdate = this.endDeviceRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("End Device not found"));
        enDeviceToUpdate.setId(endDevice.getId());
        enDeviceToUpdate.setName(endDevice.getName());
        enDeviceToUpdate.setPorts(endDevice.getPorts());
        enDeviceToUpdate.setArea(endDevice.getArea());
        return this.endDeviceRepository.save(enDeviceToUpdate);
    }

    @Override
    public void delete(String name) {
        var enDeviceToDelete = this.endDeviceRepository.findByName(name)
                .orElseThrow(()->new NoSuchElementException("End Device not found"));
        this.endDeviceRepository.delete(enDeviceToDelete);

    }

    @Override
    public void deleteById(Long id) {
        var enDeviceToDeleteById = this.endDeviceRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("End Device not found"));
        this.endDeviceRepository.delete(enDeviceToDeleteById);

    }

    @Override
    public List<EndDevice> getEverything() {
        return (List<EndDevice>) endDeviceRepository.findAll();
    }

    /*
     @Override
    public List<EndDevice> findMatchByName(String name) {
        return List.of();
    }
    */
}
