package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Cisco-conf-Test")
@Getter
@Setter
public class Cisco2900Config {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;

    private String version;
    private String hostname;
    private String enableSecret;
    private String sshVersion;
    private String sshTimeout;
    private String sshPort;
    private String dhcpExcludedAddresses;  // Guardar como una cadena JSON o separados por comas
    private String licensePid;
    private String licenseSn;
    private String usernamePrivilege;  // Guardar como una cadena JSON
    private String interfaces;  // Guardar como una cadena JSON
    private String ipRoutes;  // Guardar como una cadena JSON o separados por comas
    private String accessLists;  // Guardar como una cadena JSON
    private String lineConPassword;
    private String lineVtyPassword;



}
