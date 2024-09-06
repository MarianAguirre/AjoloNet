package com.ajoloNET.ProyectFinal.services;

import com.ajoloNET.ProyectFinal.entities.EndDevice;
import com.ajoloNET.ProyectFinal.entities.Servers;
import com.ajoloNET.ProyectFinal.entities.ServersVM;
import com.ajoloNET.ProyectFinal.repositories.EndDeviceRepository;
import com.ajoloNET.ProyectFinal.repositories.ServersRepository;
import com.ajoloNET.ProyectFinal.repositories.ServersVMRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
@Slf4j
public class ServersVMService {

    private final ServersVMRepository serversVMRepository;
    private final ServersRepository serversRepository;

    public ServersVM createVM(ServersVM serversVM, Long serverId) {
        Servers server = serversRepository.findById(serverId)
                .orElseThrow(() -> new NoSuchElementException("Server not found"));

        serversVM.setServer(server);
        return serversVMRepository.save(serversVM);
    }

    public ServersVM updateVM(Long id, ServersVM updatedVM) {
        ServersVM existingVM = serversVMRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Virtual Machine not found"));

        existingVM.setName(updatedVM.getName());
        existingVM.setIp(updatedVM.getIp());
        existingVM.setDescription(updatedVM.getDescription());
        existingVM.setServer(updatedVM.getServer());

        return serversVMRepository.save(existingVM);
    }

    public void deleteVM(Long id) {
        serversVMRepository.deleteById(id);
    }

    public ServersVM getVMById(Long id) {
        return serversVMRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Virtual Machine not found"));
    }

    public List<ServersVM> getAllVMs() {
        return serversVMRepository.findAll();
    }
}
