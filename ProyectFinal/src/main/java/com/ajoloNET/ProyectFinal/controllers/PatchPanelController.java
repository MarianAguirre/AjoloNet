package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.PatchPanel;
import com.ajoloNET.ProyectFinal.services.PatchPanelService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/patchPanel")
@Slf4j
public class PatchPanelController {

    private final PatchPanelService patchPanelService;

    @GetMapping
    public ResponseEntity<?> getEverything(){
        log.info("GET ALL Patch Panels");
        return ResponseEntity.ok(patchPanelService.getEverything());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<PatchPanel>> getId(@PathVariable Long id){
        log.info("GET_id; Patch Panel{}", id);
        return ResponseEntity.ok(this.patchPanelService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PatchPanel> post(@RequestBody PatchPanel patchPanel) {
        log.info("POST: Patch panel {}", patchPanel.getId());
        PatchPanel createdPatchPanel = patchPanelService.create(patchPanel);
        // Codificar la URI correctamente
        String encodedId = URLEncoder.encode(createdPatchPanel.getId().toString(), StandardCharsets.UTF_8);
        return ResponseEntity.created(
                        URI.create("/patchPanel/" + createdPatchPanel.getId().toString()))
                        .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatchPanel> put(@RequestBody PatchPanel patchPanel,
                                          @RequestBody Long id){
        log.info("PUT: Patch Panel {}", id);
        return ResponseEntity.ok(this.patchPanelService.update(patchPanel, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        log.info("DELETE: Patch Panel {}", id);
        this.patchPanelService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
