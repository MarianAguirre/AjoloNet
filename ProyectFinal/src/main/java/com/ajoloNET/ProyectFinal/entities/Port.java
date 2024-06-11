package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "physical_ports")
public class Port {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "router_id")
    @JsonBackReference(value = "router-port")
    private Router router;

    @ManyToOne
    @JoinColumn(name = "switch_id")
    @JsonBackReference(value = "switch-port")
    private Switch sSwitch;

    @ManyToOne
    @JoinColumn(name = "patch_id")
    @JsonBackReference(value = "patch-port")
    private PatchPanel patchPanel;

    @ManyToOne
    @JoinColumn(name = "end_device_id")
    @JsonBackReference(value = "device-port")
    private EndDevice endDevice;

//    @Column(columnDefinition = "port_type")
//    @Enumerated(value = EnumType.STRING)
//    private PortType portType;

    @Column(name = "port_number")
    private int portNumber;

    @OneToOne(mappedBy = "sourcePort", cascade = CascadeType.ALL, orphanRemoval = true)
    private PortConnection sourceConnection;

    @OneToOne(mappedBy = "destinationPort", cascade = CascadeType.ALL, orphanRemoval = true)
    private PortConnection destinationConnection;


    //Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Router getRouter() {
        return router;
    }

    public void setRouter(Router router) {
        this.router = router;
    }

    public Switch getsSwitch() {
        return sSwitch;
    }

    public void setsSwitch(Switch sSwitch) {
        this.sSwitch = sSwitch;
    }

    public PatchPanel getPatchPanel() {
        return patchPanel;
    }

    public void setPatchPanel(PatchPanel patchPanel) {
        this.patchPanel = patchPanel;
    }

    public EndDevice getEndDevice() {
        return endDevice;
    }

    public void setEndDevice(EndDevice endDevice) {
        this.endDevice = endDevice;
    }

//    public PortType getPortType() {
//        return portType;
//    }
//
//    public void setPortType(PortType portType) {
//        this.portType = portType;
//    }

    public int getPortNumber() {
        return portNumber;
    }

    public void setPortNumber(int portNumber) {
        this.portNumber = portNumber;
    }

    public PortConnection getSourceConnection() {
        return sourceConnection;
    }

    public void setSourceConnection(PortConnection sourceConnection) {
        this.sourceConnection = sourceConnection;
    }

    public PortConnection getDestinationConnection() {
        return destinationConnection;
    }

    public void setDestinationConnection(PortConnection destinationConnection) {
        this.destinationConnection = destinationConnection;
    }
}
