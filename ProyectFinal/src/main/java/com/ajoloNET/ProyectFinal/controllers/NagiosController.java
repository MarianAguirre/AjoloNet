package com.ajoloNET.ProyectFinal.controllers;

import com.ajoloNET.ProyectFinal.services.NagiosService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@Slf4j
@AllArgsConstructor
public class NagiosController {

    private final NagiosService nagiosService;

    @GetMapping("/check/{ip}")
    public ResponseEntity<StatusResponse> checkDevice(@PathVariable String ip) {
        if (ip == null || ip.isEmpty()) {
            log.warn("IP no proporcionada");
            return new ResponseEntity<>(new StatusResponse("IP no proporcionada"), HttpStatus.BAD_REQUEST);
        }

        log.info("Verificando dispositivo con IP: {}", ip);
        try {
            String result = nagiosService.checkDevice(ip).get();
            log.info("Resultado de la verificación: {}", result);
            return ResponseEntity.ok(new StatusResponse(result));
        } catch (InterruptedException | ExecutionException e) {
            log.error("Error interno al verificar el dispositivo: {}", e.getMessage(), e);
            return new ResponseEntity<>(new StatusResponse("unreachable"), HttpStatus.OK); // Devuelve "unreachable" en caso de error
        }
    }

    public static class StatusResponse {
        private String status;

        public StatusResponse() {
        }

        public StatusResponse(String status) {
            this.status = status;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
