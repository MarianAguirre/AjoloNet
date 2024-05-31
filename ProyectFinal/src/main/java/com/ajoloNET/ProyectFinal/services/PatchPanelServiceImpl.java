package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.PatchPanel;
import com.ajoloNET.ProyectFinal.entities.PortType;
import com.ajoloNET.ProyectFinal.repositories.PatchPanelRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

public class PatchPanelServiceImpl implements PatchPanelService{

    private PatchPanelRepository patchPanelRepository;

    @Override
    public Optional<PatchPanel> findById(Long id) {
        return this.patchPanelRepository.findById(id);
    }

    @Override
    public PatchPanel create(PatchPanel patchPanel) {
        patchPanel.getPorts().forEach(port -> {
            if (Objects.isNull(port.getPortType())){
                port.setPortType(PortType.PATCH_PANEL);
            }
        });
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
    public List<PatchPanel> getEverything() {
        return (List<PatchPanel>) patchPanelRepository.findAll();
    }
}
