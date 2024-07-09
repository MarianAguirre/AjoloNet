package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Port_Connections")
@Getter
@Setter
public class PortConnection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source_type")
    private String sourceType;
    @Column(name = "source_id")
    private Long sourceId;
    @Column(name = "source_port_id")
    private int sourcePort;

    @Column(name = "destination_type")
    private String destinationType;
    @Column(name = "destination_id")
    private Long destinationId;
    @Column(name = "destination_port_id")
    private int destinationPort;
}
