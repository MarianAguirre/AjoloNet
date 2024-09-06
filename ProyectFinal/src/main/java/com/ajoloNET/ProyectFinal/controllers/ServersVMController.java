package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.entities.ServersVM;
import com.ajoloNET.ProyectFinal.services.EndDeviceService;
import com.ajoloNET.ProyectFinal.services.ServersVMService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/api/virtual-machines")
@Slf4j
@Tag(name = "Virtual Server Resource")
public class ServersVMController {

    private final ServersVMService serversVMService;

    @PostMapping("/create/{serverId}")
    public ResponseEntity<ServersVM> createVM(@PathVariable Long serverId, @RequestBody ServersVM serversVM) {
        ServersVM newVM = serversVMService.createVM(serversVM, serverId);
        return new ResponseEntity<>(newVM, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ServersVM> updateVM(@PathVariable Long id, @RequestBody ServersVM serversVM) {
        ServersVM updatedVM = serversVMService.updateVM(id, serversVM);
        return new ResponseEntity<>(updatedVM, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteVM(@PathVariable Long id) {
        serversVMService.deleteVM(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServersVM> getVMById(@PathVariable Long id) {
        ServersVM vm = serversVMService.getVMById(id);
        return new ResponseEntity<>(vm, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ServersVM>> getAllVMs() {
        List<ServersVM> vms = serversVMService.getAllVMs();
        return new ResponseEntity<>(vms, HttpStatus.OK);
    }

}
