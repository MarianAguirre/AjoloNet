package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.PatchPanel;

import java.util.List;
import java.util.Optional;

public interface PatchPanelService {

    Optional<PatchPanel> findById (Long id);
    PatchPanel create(PatchPanel patchPanel);
    PatchPanel update(PatchPanel patchPanel, Long id);
    void deleteById(Long id);

    PatchPanel createPortsForPatchPanel(PatchPanel patchPanel);

    List<PatchPanel> getEverything();
}
