package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.*;
import com.ajoloNET.ProyectFinal.repositories.PatchPanelRepository;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
import com.ajoloNET.ProyectFinal.repositories.RackRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class PatchPanelServiceImpl implements PatchPanelService{

    private final PatchPanelRepository patchPanelRepository;
    private final RackRepository rackRepository;
    private final PortRepository portRepository;

    @Override
    public Optional<PatchPanel> findById(Long id) {
        return Optional.ofNullable(this.patchPanelRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Patch Panel not found")));
    }

    @Override
    public PatchPanel create(PatchPanel patchPanel) {
        patchPanel.setName("Patch Panel");
        patchPanel.setDeviceType("patch_panel");

        if (patchPanel.getRackName() != null) {
            Rack rack = rackRepository.findByName(patchPanel.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Area not found"));
            patchPanel.setRack(rack);
        }

        // Guardar el Patch Panel inicialmente
        PatchPanel savedPatch = this.patchPanelRepository.save(patchPanel);

        // Crea los puertos para el router
        createPortsForPatchPanel(savedPatch);

        // Guarda nuevamente el router con los puertos (opcional)
        return this.patchPanelRepository.save(savedPatch);
    }

    @Override
    public PatchPanel update(PatchPanel patchPanel, Long id) {
        var patchPanelToUpdate = this.patchPanelRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Patch Panel not found"));
        patchPanelToUpdate.setNumberOfPorts(patchPanel.getNumberOfPorts());
        // Si se proporciona un nombre de rack, busca y asigna el rack al router
        if (patchPanel.getRackName() != null) {
            Rack rack = rackRepository.findByName(patchPanel.getRackName())
                    .orElseThrow(() -> new NoSuchElementException("Rack not found"));
            patchPanelToUpdate.setRack(rack);
        }


        // Actualiza los puertos del patch panel según el número de puertos
        updatePortsForPatchPanel(patchPanelToUpdate);

        return this.patchPanelRepository.save(patchPanelToUpdate);
    }

    @Override
    public void deleteById(Long id) {
        var patchToDeleteById = this.patchPanelRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Patch Panel not found"));
        this.patchPanelRepository.deleteById(id);

    }

    @Override
    public PatchPanel createPortsForPatchPanel(PatchPanel patchPanel) {
        Set<Port> ports = new HashSet<>();
        for (int i = 1; i <= patchPanel.getNumberOfPorts(); i++) {
            Port port = new Port();
            port.setPatchPanel(patchPanel);
            port.setPortNumber(i);
            port.setStatus(PortStatus.AVAILABLE);
            ports.add(port);
        }
        portRepository.saveAll(ports);
        patchPanel.setPorts(ports);
        return patchPanel;
    }

    @Override
    public List<PatchPanel> getEverything() {
        return (List<PatchPanel>) patchPanelRepository.findAll();
    }


    private void updatePortsForPatchPanel(PatchPanel patchPanelToUpdate) {
        Set<Port> currentPorts = patchPanelToUpdate.getPorts();
        int desiredNumberOfPorts = patchPanelToUpdate.getNumberOfPorts();

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
            port.setPatchPanel(patchPanelToUpdate);
            port.setPortNumber(i);
            port.setStatus(PortStatus.AVAILABLE);
            currentPorts.add(port);
        }
    }
}
