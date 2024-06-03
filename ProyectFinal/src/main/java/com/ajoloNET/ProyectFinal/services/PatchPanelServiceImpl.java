package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.PatchPanel;
import com.ajoloNET.ProyectFinal.entities.PortType;
import com.ajoloNET.ProyectFinal.repositories.PatchPanelRepository;
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
public class PatchPanelServiceImpl implements PatchPanelService{

    private final PatchPanelRepository patchPanelRepository;

    @Override
    public Optional<PatchPanel> findById(Long id) {
        return Optional.ofNullable(this.patchPanelRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Patch Panel not found")));
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
