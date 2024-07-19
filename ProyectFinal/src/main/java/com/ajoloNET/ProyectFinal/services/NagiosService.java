package com.ajoloNET.ProyectFinal.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class NagiosService {

    private static final String SCRIPT_PATH = "/home/nagios/apiNagios/check_hostup.sh";

    public CompletableFuture<String> checkDevice(String deviceIp) {
        return CompletableFuture.supplyAsync(() -> {
            log.info("Iniciando verificación para la IP: {}", deviceIp);
            try {
                ProcessBuilder processBuilder = new ProcessBuilder(SCRIPT_PATH, deviceIp);
                processBuilder.redirectErrorStream(true);
                Process process = processBuilder.start();
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                StringBuilder output = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
                int exitCode = process.waitFor();
                log.info("Script ejecutado con código de salida: {}", exitCode);
                log.info("Salida del script: {}", output.toString());
                if (exitCode == 0) {
                    String stdout = output.toString();
                    if (stdout.contains("Dispositivo está alcanzable.")) {
                        return "reachable";
                    } else if (stdout.contains("Dispositivo no está alcanzable.")) {
                        return "unreachable";
                    } else {
                        throw new RuntimeException("Resultado inesperado del script.");
                    }
                } else {
                    throw new RuntimeException("Error en la ejecución del script: código de salida " + exitCode);
                }
            } catch (IOException | InterruptedException e) {
                log.error("Error al verificar el dispositivo: {}", e.getMessage(), e);
                return "unreachable"; // Devolver "unreachable" en caso de error
            }
        });
    }
}
