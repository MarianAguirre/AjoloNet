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
//////////////////////////////////////////////////////////////
    @Column(name = "source_type", nullable = false)         //
    @Enumerated(EnumType.STRING)                            //
    private DeviceType sourceType;                          //
                                                            //
    @Column(name = "source_id", nullable = false)           //
    private Long sourceId;                                  //
    @Column(name = "source_port_id", nullable = false)      //
    private int sourcePort;                                 //
                                                            //
    //////////////////////////////////////////////////////////
                                                            //
    @Column(name = "destination_type", nullable = false)    //
    @Enumerated(EnumType.STRING)                            //
    private DeviceType destinationType;                     //
                                                            //
    @Column(name = "destination_id", nullable = false)      //
    private Long destinationId;                             //
    @Column(name = "destination_port_id", nullable = false) //
    private int destinationPort;                            //
//////////////////////////////////////////////////////////////
}
