package com.ajoloNET.ProyectFinal.DTOs;

import com.ajoloNET.ProyectFinal.entities.DeviceType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortConnectionRequest {

    private DeviceType sourceType;
    private Long sourceId;
    private int sourcePort;
    private DeviceType destinationType;
    private Long destinationId;
    private int destinationPort;


}
