package com.ajoloNET.ProyectFinal.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortConectionDTO {
    private String sourceType;
    private Long sourceId;
    private int sourcePort;
    private boolean sourcePortStatus;

    private String destinationType;
    private Long destinationId;
    private int destinationPort;
    private boolean destinationPortStatus;
}

