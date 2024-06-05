package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.PatchPanel;
import com.ajoloNET.ProyectFinal.entities.Port;
import com.ajoloNET.ProyectFinal.entities.PortType;
import com.ajoloNET.ProyectFinal.repositories.PatchPanelRepository;
import com.ajoloNET.ProyectFinal.repositories.PortRepository;
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

    private final PortRepository portRepository;

    @Override
    public Optional<PatchPanel> findById(Long id) {
        return Optional.ofNullable(this.patchPanelRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Patch Panel not found")));
    }

    @Override
    public PatchPanel create(PatchPanel patchPanel) {
        return this.patchPanelRepository.save(patchPanel);
    }

    @Override
    public PatchPanel update(PatchPanel patchPanel, Long id) {
        var patchToUpdateById = this.patchPanelRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Patch Panel not found"));
        patchToUpdateById.setId(patchPanel.getId());
        patchToUpdateById.setPorts(patchPanel.getPorts());
        patchToUpdateById.setRack(patchPanel.getRack());
        return this.patchPanelRepository.save(patchToUpdateById);
    }

    @Override
    public void deleteById(Long id) {
        var patchToDeleteById = this.patchPanelRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Patch Panel not found"));
        this.patchPanelRepository.delete(patchToDeleteById);

    }

    @Override
    public PatchPanel createPortsForPatchPanel(PatchPanel patchPanel) {
        Set<Port> ports = new HashSet<>();
        for (int i = 1; i <= patchPanel.getNumberOfPorts(); i++) {
            Port port = new Port();
            port.setPatchPanel(patchPanel);
            port.setPortType(PortType.PATCH_PANEL);
            port.setPortNumber(i);
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
}
